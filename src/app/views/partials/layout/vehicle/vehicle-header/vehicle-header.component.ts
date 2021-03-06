import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {
  BrandService, Client,
  Company,
  GasTypeService,
  ModelService,
  SubtypeService,
  TransmissionService, UseTypeService,
  Vehicle,
  VehicleService
} from '../../../../../core/admin';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SweetAlertOptions} from 'sweetalert2';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap} from 'rxjs/operators';
import {ClientVehicleService} from '../../../../../core/admin/_services/client-vehicle.service';
import {CompanyVehicleService} from '../../../../../core/admin/_services/company-vehicle.service';
import {isObject} from "util";

@Component({
  selector: 'kt-vehicle-header',
  templateUrl: './vehicle-header.component.html',
  styleUrls: ['./vehicle-header.component.scss']
})

export class VehicleHeaderComponent implements OnInit {
  @Input() searchLicencePlate: string;
  @Input() vehicleSelected: Vehicle;
  @Input() clientSelected: Client;
  @Input() companySelected: Company;
  @Input() type: string; // can be, button, link, label-button
  @Input() onlyVehicle: boolean;

  @Output() vehicleUpdateListRequestEmit = new EventEmitter<Vehicle>();
  @Output() vehicleAddListRequestEmit = new EventEmitter<Vehicle>();

  // @ViewChild('deleteVehicleModal', {static: false}) private deleteVehicleModal: SwalComponent;
  @ViewChild('addVehicleModal', {static: false}) private addVehicleModal: SwalComponent;

  public vehicleAddFormControl: FormGroup;
  public vehicle: Vehicle; // New vehicle
  public loading = false;
  public addModalOption: SweetAlertOptions;
  public deleteModalOption: SweetAlertOptions;
  public brands: Observable<any[]>;
  public models: Observable<any[]>;
  public subtypes: any[];
  public subtypesFiltered: Observable<any[]>;
  public transmissions: any[];
  public transmissionsFiltered: Observable<any[]>;
  public gastypes: any[];
  public gastypesFiltered: Observable<any[]>;
  public usetypes: any[];
  public usetypesFiltered: Observable<any[]>;


  constructor(
    private vehicleService: VehicleService,
    public readonly swalTargets: SwalPortalTargets,
    private fb: FormBuilder,
    private brandService: BrandService,
    private modelService: ModelService,
    private subtypeService: SubtypeService,
    private transmissionService: TransmissionService,
    private gasTypeService: GasTypeService,
    private useTypeService: UseTypeService,
    private clientVehicleService: ClientVehicleService,
    private companyVehicleService: CompanyVehicleService
  ) { }

  ngOnInit() {
    this.initRegisterVehicleForm();
    this.vehicle = new Vehicle();
    this.vehicle.clear();
    this.addModalOption = {
      title: 'Nuevo Vehículo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Crear vehículo',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addVehicle()
    };
    this.deleteModalOption = {
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Eliminar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () => this.deleteVehicle(this.vehicleSelected)
    };
    this.bindAutocompleteFields();

  }

  deleteVehicle(vehicle: Vehicle) {
    const response = this.vehicleService.delete(vehicle.id);
    return new Promise((resolve, reject) => {
      response.subscribe(
        () => resolve(),
        error => reject()
      );
    });
  }
  addVehicle() {
    const controls = this.vehicleAddFormControl.controls;
    // check form
    if (this.vehicleAddFormControl.invalid) {

      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      return false;
    }
    let postObj = this.vehicleAddFormControl.getRawValue();
    Object.keys(postObj).forEach(controlName => {
      if(['brand', 'model', 'subtype', 'transmission', 'gas_type', 'use_type'].indexOf(controlName) >= 0) {
        if(postObj[controlName]['id'] == undefined || postObj[controlName]['id'] == null) {
          delete postObj[controlName];
        }
      }
      if(['year', 'mileage'].indexOf(controlName) >= 0) {
        if(typeof postObj[controlName] != 'number') {
          delete postObj[controlName];
        }
      }
    });
    const response = this.vehicleService.post(postObj);
    return new Promise((resolve, reject) => {
      response.subscribe(
        (vehicle) => {
          if (this.onlyVehicle) {
            this.vehicleAddFormControl.reset();
            this.addListRequest(vehicle);
            resolve();
            return;
          }
          if (this.clientSelected) {
            this.clientVehicleService.post(
              {
                  client: {id: this.clientSelected.id},
                  vehicle: {id: vehicle.id}
              }
            ).subscribe(() => {
              this.vehicleAddFormControl.reset();
              this.addListRequest(vehicle);
              resolve();
            });
          }
          if (this.companySelected) {
            this.companyVehicleService.post(
              {
                company: {id: this.companySelected.id},
                vehicle: {id: vehicle.id},
                responsible: {id: 1}
              }
            ).subscribe(() => {
              this.vehicleAddFormControl.reset();
              this.addListRequest(vehicle);
              resolve();
            });
          }
        }
      );
    });
  }

  updateListRequest(vehicle: Vehicle) {
    this.vehicleUpdateListRequestEmit.emit(vehicle);
  }

  addListRequest(vehicle: Vehicle) {
    this.vehicleAddListRequestEmit.emit(vehicle);
  }

  openAddVehicleModal(event: any) {
    this.loadEnums();
    this.addVehicleModal.fire().then((result) => {
      if (result.value) {
        // TODO Message for confirm creation
      }
    });
  }
  // openDeleteVehicleModal(event: any) {
  //   this.deleteVehicleModal.fire().then((result) => {
  //     if (result.value) {
  //       this.updateListRequest(this.vehicleSelected);
  //     }
  //   });
  // }

  initRegisterVehicleForm() {
    this.vehicleAddFormControl = this.fb.group({
      license_plate: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ])
      ],
      mileage: ['', Validators.compose([])
      ],
      year: ['', Validators.compose([])
      ],
      brand: ['', Validators.compose([]),
      ],
      model: ['', Validators.compose([]),
      ],
      subtype: ['', Validators.compose([
        Validators.required
      ]),
      ],
      transmission: ['', Validators.compose([]),
      ],
      gas_type: ['', Validators.compose([]),
      ],
      use_type: ['', Validators.compose([]),
      ]
    });

    if (this.searchLicencePlate) {
      this.vehicleAddFormControl.controls['license_plate'].setValue(this.searchLicencePlate);
    }
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.vehicleAddFormControl.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  bindAutocompleteFields() {
    this.brands = this.vehicleAddFormControl.controls.brand.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getBrands(val);
      })
    );

    this.models = this.vehicleAddFormControl.controls.model.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getModels(val);
      })
    );
  }

  getBrands(name) {
    return this.brandService.quickSearch(name);
  }

  getModels(name) {
    return this.modelService.quickSearch(name);
  }

  getSubtypes(name) {
    return this.subtypeService.quickSearch(name);
  }

  getTransmissions(name) {
    return this.transmissionService.quickSearch(name);
  }

  getGasTypes(name) {
    return this.gasTypeService.quickSearch(name);
  }

  getUseTypes(name) {
    return this.useTypeService.quickSearch(name);
  }

  displayName(obj: any): string|undefined {
    return obj ? obj.name : undefined;
  }
  resetForm() {
    this.vehicleAddFormControl.reset();
    this.clientSelected = undefined;
    this.companySelected = undefined;
  }
  loadEnums() {

    this.subtypeService.all().subscribe(
      (subtypes) => {
        this.subtypes = subtypes;
        /**
         * Bind autocomplete list after get enumerator
         */
        this.subtypesFiltered = this.vehicleAddFormControl.controls.subtype.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(this.subtypes, value))
        );
      });
    this.transmissionService.all().subscribe(
      (transmissions) => {
        this.transmissions = transmissions;
        /**
         * Bind autocomplete list after get enumerator
         */
        this.transmissionsFiltered = this.vehicleAddFormControl.controls.transmission.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(this.transmissions, value))
        );
      }
    );
    this.gasTypeService.all().subscribe(
      (gasTypes) => {
        this.gastypes = gasTypes;
        /**
         * Bind autocomplete list after get enumerator
         */
        this.gastypesFiltered = this.vehicleAddFormControl.controls.gas_type.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(this.gastypes, value))
        );
      }
    );
    this.useTypeService.all().subscribe(
      (useTypes) => {
        this.usetypes = useTypes;
        this.usetypesFiltered = this.vehicleAddFormControl.controls.use_type.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(this.usetypes, value))
        );
      }
    );
  }

  /**
   * Acept enumerator with id and name properties
   *
   * @param vehicleEnum
   * @param value
   * @private
   */
  private _filter(vehicleEnum: any[], value: string): any[] {
    if (!isObject(value) && value != '' && value !=undefined && value != null) {
      return vehicleEnum.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
    return vehicleEnum;
  }
}
