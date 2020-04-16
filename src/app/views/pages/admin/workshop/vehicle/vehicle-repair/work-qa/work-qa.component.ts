import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {OperatorService, QaService, Vehicle} from '../../../../../../../core/admin';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";
import {environment} from '../../../../../../../../environments/environment';

@Component({
  selector: 'kt-work-qa',
  templateUrl: './work-qa.component.html',
  styleUrls: ['./work-qa.component.scss']
})
export class WorkQaComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  @Input() vehicle: Vehicle;
  @Input() operatorEnum: any[] = [];
  // @Output() changeStatusRejectedEmit = new EventEmitter<any>();
  @ViewChild('qaNoteModal', {static: false}) public qaNoteModal: SwalComponent;
  public qaNoteModalOption: SweetAlertOptions;
  public qa: any;
  public qaHistory: any;
  public messageError: string;
  public lastNote: string;
  public accepted: boolean;
  constructor(
    private qaService: QaService
  ) { }

  ngOnInit() {
    this.qaNoteModalOption = {
      title: 'Agregar Nota',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6a6cf8',
      confirmButtonText: 'Cambiar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addNote()
    };
  }

  ngOnChanges(changes) {
    if (this.operatorEnum) {
      this.qaService.get(this.vehicleReception.id).subscribe(
        (qa) => {
          this.qa = qa;
          this.getHistory();
        },
        error => {
          this.messageError = "No hay reporte de Calidad"
        }
      )
    }
  }

  public updateQa(selected: any) {
    this.qaService.update({
      "operator": {
        "id": selected.value
      }
    }, this.qa.id).subscribe(
      (result) => {
        console.log(result)
      }
    );
  }

  public openQaNoteModal(event: any, accepted: boolean) {
    this.lastNote = "";
    this.accepted = accepted;
    this.qaNoteModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }

  public addNote() {
    if (this.vehicle) {
      this.qaService.update({
        "notes": this.lastNote,
        "accepted": this.accepted
      }, this.qa.id).subscribe(
        (result) => {
          this.qa = result;
          this.getHistory();
          if (this.accepted) {
            this.qaService.updateStatusReceptionMessage.emit(environment.WORK_STATUS_ACCEPTED_QA_ID);
          }
          else {
            this.qaService.updateStatusReceptionMessage.emit(environment.WORK_STATUS_REJECTED_QA_ID);
          }
        }
      );
    }
  }

  private getHistory() {
    this.qaService.history(this.qa.id).subscribe(
      (qaHistory) => {
        this.qaHistory = qaHistory;
      }
    );
  }
}
