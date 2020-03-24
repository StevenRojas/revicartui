import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {
  OperatorService,
  QaService,
  StatusNoteService,
  Vehicle,
  VehicleReparationService,
  WorkstationService
} from '../../../../../../../core/admin';
import {WorkstatusService} from '../../../../../../../core/admin/_services/workstatus.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";
import {environment} from '../../../../../../../../environments/environment';

@Component({
  selector: 'kt-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.scss']
})
export class WorkHeaderComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle;
  @Input() totalAccessories: number;
  @Input() totalWorkTodo: number;
  @Input() vehicleReception: any;
  @Input() operatorEnum: any[] = [];
  @Output() updateWorkStatusEmit = new EventEmitter<any>();
  @ViewChild('statusHistoryModal', {static: false}) public statusHistoryModal: SwalComponent;
  public statusHistoryModalOption: SweetAlertOptions;
  public displayIndex: number;
  // public operatorEnum = [];
  public workStationEnum = [];
  public workStatusEnum = [];
  public statusHistoryNotes = [];
  public total: number = 0;

  constructor(
    private operatorService: OperatorService,
    private workstationService: WorkstationService,
    private workstatusService: WorkstatusService,
    private statusNoteService: StatusNoteService,
    private qaService: QaService
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
    this.getEnums();
  }

  ngOnChanges(changes) {
    if (this.vehicle.id) {

    }
    if (this.vehicleReception.id) {
      this.getStatusHistory();
      this.total = 0;
      if (this.totalAccessories) {
        this.total += this.totalAccessories;
      }
      if (this.totalWorkTodo) {
        this.total += this.totalWorkTodo;
      }
    }
  }

  public getEnums() {
    this.workstationService.getAll().subscribe(
      (workstations) => {
        this.workStationEnum = workstations;
      }
    );

    this.workstatusService.getAll().subscribe(
      (workStatus) => {
        let tempWorkStatus = [];
        Object.keys(workStatus).forEach((key) => {
          console.log(workStatus[key])
          if (!environment.BANNED_STATUS.find(id => id == workStatus[key]['id'])) {
            tempWorkStatus.push(workStatus[key]);
          }
        });
        this.workStatusEnum = tempWorkStatus;
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


    return true;
  }

  public updateWorkstation(event: any) {
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

  public emitChangeValue(event: any) {
    // if (event <= environment.SHOW_REPARATION_WHEN_ID_STATUS_UP) {
    this.updateWorkStatusEmit.emit(event);
    // }
  }

  editStatusHistory(id: number, value: string, key: number) {
    this.displayIndex = -1;
    this.statusNoteService.update({
      notes: value
    }, this.vehicleReception.id, id).subscribe(
      (note) => {
        this.statusHistoryNotes[key] = note;
      }
    );
  }
}
