import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HistoryService} from '../../../../../../../core/admin';
import {environment} from '../../../../../../../../environments/environment';
import {DialogPrintReceptionDialog} from '../../vehicle-reception/vehicle-reception.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'kt-work-documents',
  templateUrl: './work-documents.component.html',
  styleUrls: ['./work-documents.component.scss']
})
export class WorkDocumentsComponent implements OnInit, OnChanges {
  @Input() receptionId: number;
  public documentsList = [];
  public urlDocument = environment.urlImages
  constructor(
    private historyService: HistoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.receptionId) {
      this.historyService.getDocuments(this.receptionId).subscribe(
        (documentsList) => {
          this.documentsList = documentsList;
        }
      );
    }
  }

  public openPrintPreviewModal(documentFile) {
    this.dialog.open(DialogPrintReceptionDialog, {
      data: {
        pdfFile: this.urlDocument + documentFile,
        vehicleReceptionId: this.receptionId,
        displayOptions: false
      }
    });
  }
}
