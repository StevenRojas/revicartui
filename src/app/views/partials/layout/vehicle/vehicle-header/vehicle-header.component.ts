import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Vehicle, VehicleService} from '../../../../../core/admin';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'kt-vehicle-header',
  templateUrl: './vehicle-header.component.html',
  styleUrls: ['./vehicle-header.component.scss']
})
export class VehicleHeaderComponent implements OnInit {
  @Input() vehicleSelected: Vehicle;
  @Output() vehicleUpdateListRequestEmit = new EventEmitter<Vehicle>();
  @Output() vehicleAddListRequestEmit = new EventEmitter<Vehicle>();

  @ViewChild('deleteVehicleModal', {static: false}) private deleteVehicleModal: SwalComponent;
  @ViewChild('addVehicleModal', {static: false}) private addVehicleModal: SwalComponent;

  public vehicleAddFormControl: FormGroup;
  public vehicle: Vehicle; // New vehicle
  public loading = false;
  public addModalOption: SweetAlertOptions;
  public deleteModalOption: SweetAlertOptions;
  constructor(
    private vehicleService: VehicleService,
    public readonly swalTargets: SwalPortalTargets,
    private fb: FormBuilder,
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
      confirmButtonText: 'Crear vehiclee',
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
          this.addListRequest(vehicle);
          resolve();
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
      has_alert: ['', Validators.compose([])
      ],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      phone: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      cell_phone: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      email: ['', Validators.compose([
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]),
      ],
      address: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ],
      business_name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
      ]),
      ],
      nit: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(200)
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

}
