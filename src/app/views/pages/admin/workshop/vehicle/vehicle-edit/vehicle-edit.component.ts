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
  public subtypes: Observable<any[]>;
  public transmissions: Observable<any[]>;
  public gastypes: Observable<any[]>;
  public usetypes: Observable<any[]>;
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
    this.loadVehicle();
  }

  loadVehicle() {
    if (this.vehicle.id) {
      this.vehicleFormControl.get('id').setValue(this.vehicle.id);
    }
    this.vehicleFormControl.get('license_plate').setValue(this.vehicle.license_plate);
    this.vehicleFormControl.get('mileage').setValue(this.vehicle.mileage);
    this.vehicleFormControl.get('year').setValue(this.vehicle.year);
    this.vehicleFormControl.get('brand').setValue(this.vehicle.brand);
    this.vehicleFormControl.get('model').setValue(this.vehicle.model);
    this.vehicleFormControl.get('subtype').setValue(this.vehicle.subtype);
    this.vehicleFormControl.get('transmission').setValue(this.vehicle.transmission);
    this.vehicleFormControl.get('gas_type').setValue(this.vehicle.gas_type);
    this.vehicleFormControl.get('use_type').setValue(this.vehicle.use_type);
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

    this.subtypes = this.vehicleFormControl.controls.subtype.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getSubtypes(val);
      })
    );

    this.transmissions = this.vehicleFormControl.controls.transmission.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getTransmissions(val);
      })
    );

    this.gastypes = this.vehicleFormControl.controls.gas_type.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap( val => {
        return this.getGasTypes(val);
      })
    );

    this.usetypes = this.vehicleFormControl.controls.use_type.valueChanges.pipe(
      filter(res => res !== null && res !== '' && res !== undefined),
      filter(res => res.length > 2),
      debounceTime(600),
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
    this.vehicleService.put(this.vehicleFormControl.getRawValue()).subscribe(
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
