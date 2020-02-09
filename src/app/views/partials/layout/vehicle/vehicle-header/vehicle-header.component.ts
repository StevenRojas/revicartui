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
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {ClientVehicleService} from '../../../../../core/admin/_services/client-vehicle.service';
import {CompanyVehicleService} from '../../../../../core/admin/_services/company-vehicle.service';

@Component({
  selector: 'kt-vehicle-header',
  templateUrl: './vehicle-header.component.html',
  styleUrls: ['./vehicle-header.component.scss']
})

export class VehicleHeaderComponent implements OnInit {
  @Input() vehicleSelected: Vehicle;
  @Input() clientSelected: Client;
  @Input() companySelected: Company;
  @Input() type: string; // can be, button, link, label-button
  @Input() onlyVehicle: boolean;

  @Output() vehicleUpdateListRequestEmit = new EventEmitter<Vehicle>();
  @Output() vehicleAddListRequestEmit = new EventEmitter<Vehicle>();

  @ViewChild('deleteVehicleModal', {static: false}) private deleteVehicleModal: SwalComponent;
  @ViewChild('addVehicleModal', {static: false}) private addVehicleModal: SwalComponent;

  public vehicleAddFormControl: FormGroup;
  public vehicle: Vehicle; // New vehicle
  public loading = false;
  public addModalOption: SweetAlertOptions;
  public deleteModalOption: SweetAlertOptions;
  public brands: Observable<any[]>;
  public models: Observable<any[]>;
  public subtypes: Observable<any[]>;
  public transmissions: Observable<any[]>;
  public gastypes: Observable<any[]>;
  public usetypes: Observable<any[]>;

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
    const response = this.vehicleService.post(this.vehicleAddFormControl.getRawValue());
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
    console.log(this.companySelected)
    this.addVehicleModal.fire().then((result) => {
      if (result.value) {
        // TODO Message for confirm creation
      }
    });
  }
  openDeleteVehicleModal(event: any) {
    this.deleteVehicleModal.fire().then((result) => {
      if (result.value) {
        this.updateListRequest(this.vehicleSelected);
      }
    });
  }

  initRegisterVehicleForm() {
    this.vehicleAddFormControl = this.fb.group({
      license_plate: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ])
      ],
      mileage: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ])
      ],
      year: ['', Validators.compose([])
      ],
      brand: ['', Validators.compose([
        Validators.required
      ]),
      ],
      model: ['', Validators.compose([
        Validators.required
      ]),
      ],
      subtype: ['', Validators.compose([
        Validators.required
      ]),
      ],
      transmission: ['', Validators.compose([
        Validators.required
      ]),
      ],
      gas_type: ['', Validators.compose([
        Validators.required
      ]),
      ],
      use_type: ['', Validators.compose([
        Validators.required
      ]),
      ]
    });
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

    this.subtypes = this.vehicleAddFormControl.controls.subtype.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getSubtypes(val);
      })
    );

    this.transmissions = this.vehicleAddFormControl.controls.transmission.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getTransmissions(val);
      })
    );

    this.gastypes = this.vehicleAddFormControl.controls.gas_type.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getGasTypes(val);
      })
    );

    this.usetypes = this.vehicleAddFormControl.controls.use_type.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 1),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getUseTypes(val);
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
}
