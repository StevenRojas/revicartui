import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {
  BrandService, Client,
  GasTypeService,
  ModelService,
  SubtypeService,
  TransmissionService,
  UseTypeService,
  Vehicle, VehicleService
} from '../../../../../../core/admin';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientVehicleService} from '../../../../../../core/admin/_services/client-vehicle.service';
import {CompanyVehicleService} from '../../../../../../core/admin/_services/company-vehicle.service';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'kt-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit, OnChanges {

  @Input() vehicle: Vehicle;
  @Output() vehicleUpdateEmit = new EventEmitter<Vehicle>();

  public loading = false;
  public errors: any = [];
  public vehicleFormControl: FormGroup;
  public brands: Observable<any[]>;
  public models: Observable<any[]>;
  public subtypes: any[];
  public transmissions: any[];
  public gastypes: any[];
  public usetypes: any[];
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private modelService: ModelService,
    private subtypeService: SubtypeService,
    private gasTypeService: GasTypeService,
    private useTypeService: UseTypeService,
    private vehicleService: VehicleService,
    private transmissionService: TransmissionService,
    private clientVehicleService: ClientVehicleService,
    private companyVehicleService: CompanyVehicleService
  ) {
    this.vehicle = new Vehicle();
  }

  ngOnInit() {
    this.initRegisterVehicleForm();
    this.bindAutocompleteFields();
  }

  ngOnChanges(changes) {
    if (this.vehicleFormControl) {
      this.loadVehicle();
    }
  }

  initRegisterVehicleForm() {
    this.vehicleFormControl = this.fb.group({
      id: ['', Validators.compose([])
      ],
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
    this.loadVehicle();
  }

  loadVehicle() {
    if (this.vehicle.id) {
      this.vehicleFormControl.patchValue({
        'id': this.vehicle.id
      });
    }
    this.vehicleFormControl.patchValue({
      'license_plate': this.vehicle.license_plate,
      'mileage': this.vehicle.mileage,
      'year': this.vehicle.year,
      'brand': this.vehicle.brand,
      'model': this.vehicle.model,
    //   // 'subtype': this.vehicle.subtype,
    //   'transmission': this.vehicle.transmission,
    //   'gas_type': this.vehicle.gas_type,
    //   'use_type': this.vehicle.use_type
    });
  }

  bindAutocompleteFields() {
    this.brands = this.vehicleFormControl.controls.brand.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getBrands(val);
      })
    );

    this.models = this.vehicleFormControl.controls.model.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getModels(val);
      })
    );
    this.subtypeService.all().subscribe(
      (subtypes) => {
        this.subtypes = subtypes;
        if (this.vehicle.subtype) {
          const selected = this.subtypes.find(s => s.id == this.vehicle.subtype.id)
          this.vehicleFormControl.get('subtype').setValue(selected);
        }

    });
    this.transmissionService.all().subscribe(
      (transmissions) => {
        this.transmissions = transmissions;
        if (this.vehicle.transmission) {
          const selected = this.transmissions.find(s => s.id == this.vehicle.transmission.id)
          this.vehicleFormControl.get('transmission').setValue(selected);
        }
      }
    );
    this.gasTypeService.all().subscribe(
      (gasTypes) => {
        this.gastypes = gasTypes;
        if (this.vehicle.gas_type) {
          const selected = this.gastypes.find(s => s.id == this.vehicle.gas_type.id)
          this.vehicleFormControl.get('gas_type').setValue(selected);
        }
      }
    );
    this.useTypeService.all().subscribe(
      (useTypes) => {
        this.usetypes = useTypes;
        if (this.vehicle.use_type) {
          const selected = this.usetypes.find(s => s.id == this.vehicle.use_type.id)
          this.vehicleFormControl.get('use_type').setValue(selected);
        }
      }
    );
  }

  getBrands(name) {
    return this.brandService.quickSearch(name);
  }

  getModels(name) {
    return this.modelService.quickSearch(name);
  }

  displayName(obj: any): string|undefined {
    return obj ? obj.name : undefined;
  }
  resetForm() {
    this.vehicleFormControl.reset();
  }

  submit() {
    const controls = this.vehicleFormControl.controls;
    // check form
    if (this.vehicleFormControl.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;
    let putObj = this.vehicleFormControl.getRawValue();
    Object.keys(putObj).forEach(controlName => {
      if(['brand', 'model', 'subtype', 'transmission', 'gas_type', 'use_type'].indexOf(controlName) >= 0) {
        if(putObj[controlName]['id'] == undefined || putObj[controlName]['id'] == null) {
          delete putObj[controlName];
        }
      }
      if(['year', 'mileage'].indexOf(controlName) >= 0) {
        if(typeof putObj[controlName] != 'number') {
          delete putObj[controlName];
        }
      }
    });
    this.vehicleService.put(putObj).subscribe(
      (vehicle: Vehicle) => {
        this.updatedVechicle(vehicle as Vehicle);
        setTimeout(() => {
          this.loading = false;
          this.vehicleFormControl.markAsDirty({
            onlySelf: false
          });
        }, 900);
      }
    );
  }


  updatedVechicle(vehicle: Vehicle) {
    this.vehicleUpdateEmit.emit(vehicle);
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.vehicleFormControl.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
