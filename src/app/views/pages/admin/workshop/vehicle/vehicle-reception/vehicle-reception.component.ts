import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Vehicle, VehicleReceptionService} from '../../../../../../core/admin';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'kt-vehicle-reception',
  templateUrl: './vehicle-reception.component.html',
  styleUrls: ['./vehicle-reception.component.scss']
})
export class VehicleReceptionComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle;
  @Input() vehicleReception: any;
  @Output() updateVehicleReceptionEmit = new EventEmitter<any>();
  @Output() goToReparationEmit = new EventEmitter<any>();
  public reception: any;
  public cancelReceptionModalOption: SweetAlertOptions;
  public approveReceptionModalOption: SweetAlertOptions;
  @ViewChild('cancelReceptionModal', {static: false}) private cancelReceptionModal: SwalComponent;
  @ViewChild('approveReceptionModal', {static: false}) private approveReceptionModal: SwalComponent;
  public readOnlyStatus = true;
  public cancelFormGroup: FormGroup;

  constructor(
    private vehicleReceptionServices: VehicleReceptionService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.cancelReceptionModalOption = {
      title: 'Cancelar',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#5d78ff',
      type: 'error',
      confirmButtonText: 'Si',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.cancelReception()
    };
    this.approveReceptionModalOption = {
      title: 'Aprovar',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#5d78ff',
      type: 'success',
      confirmButtonText: 'Si',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.approveReception()
    };
    this.initCancelFormControl();
  }

  ngOnChanges(changes) {
    if (this.vehicle.id) {
      this.readOnlyStatus = this.vehicleReception.work_status >= environment.WORK_STATUS_ACCEPTED_ID;
    }
  }

  public initCancelFormControl() {
    this.cancelFormGroup = this.fb.group({
      notes: ['', Validators.compose([Validators.required])
      ]
    });
  }

  public openCancelReceptionModal() {
    this.cancelReceptionModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }

  public openApproveReceptionModal() {
    this.approveReceptionModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }

  /**
   * Update Vehicle Reception Status and emit a update message
   */
  public cancelReception() {
    const controls = this.cancelFormGroup.controls;
    // check form
    if (this.cancelFormGroup.invalid) {
      Object.keys(controls).forEach(controlName => {
        controls[controlName].markAsTouched();
      });
      return false;
    }
    const response = this.vehicleReceptionServices.cancel(this.vehicleReception.id, this.cancelFormGroup.getRawValue());
    return new Promise((resolve, reject) => {
      response.subscribe(
        (response) => {
          this.cancelFormGroup.reset();
          this.vehicleReception = null;
          this.updateVehicleReceptionEmit.emit(true);
          resolve();
        }
      );
    });
  }
  /**
   * Update Vehicle Reception Status and emit a update message
   */
  public approveReception() {
    const response = this.vehicleReceptionServices.approve(this.vehicleReception.id);
    return new Promise((resolve, reject) => {
      response.subscribe(
        (response) => {
          this.updateVehicleReceptionEmit.emit(true);
          this.goToReparationEmit.emit(true);
          resolve();
        }
      );
    });
  }

  public startReception() {
    this.vehicleReceptionServices.start(this.vehicle.id).subscribe(
      (response) => {
        this.updateVehicleReceptionEmit.emit(true);
        // this.loadVehicleReception();
      }
    )
  }


  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  public isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.cancelFormGroup.controls[controlName];
    // console.log(control)
    if (!control) {
      return false;
    }
    // console.log(control)
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
