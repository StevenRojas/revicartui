import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HistoryService} from '../../../../../../../core/admin';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'kt-work-resume',
  templateUrl: './work-resume.component.html',
  styleUrls: ['./work-resume.component.scss']
})
export class WorkResumeComponent implements OnInit, OnChanges {
  @Input() receptionId: number;
  public workList = [];
  public total = 0;
  public noteSelected: string;
  @ViewChild('noteModal', {static: false}) private noteModal: SwalComponent;
  public noteModalOption: SweetAlertOptions;
  constructor(
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.noteModalOption = {
      title: 'Nota del trabajo',
      showCancelButton: false,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Ok',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      focusCancel: true
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.receptionId) {
      this.total = 0;
      this.historyService.getWork(this.receptionId).subscribe(
        (workList) => {
          this.workList = workList;
          Object.keys(this.workList).forEach((value, key) => {
            this.total += parseFloat(this.workList[key]['price']);
          });
        }
      );
    }
  }

  openModalNotes(note: string) {
    this.noteSelected = note;
    this.noteModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }
}
