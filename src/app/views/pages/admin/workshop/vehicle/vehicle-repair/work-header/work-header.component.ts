import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {OperatorService, StatusNoteService, Vehicle, VehicleReparationService, WorkstationService} from '../../../../../../../core/admin';
import {WorkstatusService} from '../../../../../../../core/admin/_services/workstatus.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'kt-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.scss']
})
export class WorkHeaderComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle;
  @Input() totalAccessories: number;
  @Input() vehicleReception: any;
  @ViewChild('statusHistoryModal', {static: false}) public statusHistoryModal: SwalComponent;
  public statusHistoryModalOption: SweetAlertOptions;

  public operatorEnum = [];
  public workStationEnum = [];
  public workStatusEnum = [];
  public statusHistoryNotes = [];

  constructor(
    private operatorService: OperatorService,
    private workstationService: WorkstationService,
    private workstatusService: WorkstatusService,
    private statusNoteService: StatusNoteService
  ) { }

  ngOnInit() {
    this.statusHistoryModalOption = {
      title: 'Historial de Estados',
      showCancelButton: false,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6a6cf8',
      confirmButtonText: 'Cerrar',
      confirmButtonClass: 'btn btn-danger btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      type: 'info',
      focusCancel: true,
      // preConfirm: () =>  this.deleteVehicle()
    };
  }

  ngOnChanges(changes) {
    if (this.vehicle.id) {
      this.getEnums();
    }
    if (this.vehicleReception.id) {
      this.getStatusHistory();
    }
  }

  public getEnums() {
    this.operatorService.getAll().subscribe(
      (operators) => {
        this.operatorEnum = operators;
      }
    );

    this.workstationService.getAll().subscribe(
      (workstations) => {
        this.workStationEnum = workstations;
      }
    );

    this.workstatusService.getAll().subscribe(
      (workStatus) => {
        this.workStatusEnum = workStatus;
      }
    );
  }

  public getStatusHistory() {
    this.statusNoteService.getAll(this.vehicleReception.id).subscribe(
      (statusHistoryNotes) => {
        this.statusHistoryNotes = statusHistoryNotes;
      }
    );
  }

  public updateOperator(event: any) {
    this.operatorService.update({
      'id': event.value
    }, this.vehicleReception.id).subscribe(
      (operator) => {
        console.log(operator);
      }
    );
  }

  public updateStatus(event: any) {
    this.workstatusService.update({
      'id': event.value
    }, this.vehicleReception.id).subscribe(
      (status) => {
        console.log(status);
      }
    )
  }

  public updateWorkstation(event: any) {
    console.log(event.value)
    this.workstationService.update({
      'id': event.value
    }, this.vehicleReception.id).subscribe(
      (status) => {
        console.log(status);
      }
    )
  }

  public openStatusHistoryModal(event: any) {
    this.statusHistoryModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }
}
