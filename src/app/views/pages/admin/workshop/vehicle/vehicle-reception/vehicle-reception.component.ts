import {Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Vehicle, VehicleReceptionService} from '../../../../../../core/admin';
import {SweetAlertOptions} from "sweetalert2";
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

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
  public printPreviewModalOption: SweetAlertOptions;
  @ViewChild('cancelReceptionModal', {static: false}) private cancelReceptionModal: SwalComponent;
  @ViewChild('approveReceptionModal', {static: false}) private approveReceptionModal: SwalComponent;
  @ViewChild('printPreviewModal', {static: false}) private printPreviewModal: SwalComponent;
  public readOnlyStatus = true;
  public cancelFormGroup: FormGroup;
  public withPhotos: boolean;
  public withPrices: boolean;
  public pdfFile: any;

  constructor(
    private vehicleReceptionServices: VehicleReceptionService,
    private fb: FormBuilder,
    private router: Router,
    private render: Renderer2,
    public dialog: MatDialog,
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
    this.printPreviewModalOption = {
      title: 'Vista previa',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      // type: 'success',
      confirmButtonText: 'Imprimir',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.printReception()
    };
    this.initCancelFormControl();
  }

  ngOnChanges(changes) {
    if (this.vehicle.id) {
      if (this.vehicleReception) {
        this.readOnlyStatus = this.vehicleReception.work_status >= environment.WORK_STATUS_ACCEPTED_ID;
      }
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

  public openPrintPreviewModal() {
    this.vehicleReceptionServices.print(this.vehicleReception.id, 0, 0).subscribe(
      (pdfFile) => {
        setTimeout(() => {
          this.dialog.open(DialogPrintReceptionDialog, {
            data: {
              pdfFile: pdfFile.replace('"', '').replace('"', ''),
              vehicleReceptionId: this.vehicleReception.id,
              displayOptions: true
            }
          });
        }, 300)
      }
    );



    // this.vehicleReceptionServices.print(this.vehicleReception.id, 0, 0).subscribe(
    //   (pdfFile) => {
    //     this.printPreviewModal.fire().then((result) => {
    //       if (result.value) {
    //         // After press "Ok" button
    //       } else {
    //         // After press "Cancel" button or leave from modal
    //       }
    //     });
    //   }
    // );
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

  public printReception() {

    return true;
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

  public updatePreviewPrinter(event: any) {
  }

}

@Component({
  selector: 'dialog-print-reception-dialog',
  template: `
      <div mat-dialog-content style="width: 800px; height: 800px;margin-bottom: 30px" >

            <section class="text-right" *ngIf="data.displayOptions">
              <mat-checkbox class="mr-2" (change)="updatePreviewPrinter($event)" [(ngModel)]="withPhotos">Fotos</mat-checkbox>
              <mat-checkbox class="ml-2" (change)="updatePreviewPrinter($event)" [(ngModel)]="withPrices">Precios</mat-checkbox>
            </section>
            <ng-container *ngIf="data.pdfFile">
              <ng2-pdfjs-viewer #pdfViewer pdfSrc="{{ data.pdfFile }}" ></ng2-pdfjs-viewer>
            </ng-container>

      </div>
	`,
})
export class DialogPrintReceptionDialog {
  public withPhotos: any;
  public withPrices: any;
  @ViewChild('pdfViewer', {static: false}) public pdfViewer;
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: any,
              public vehicleReceptionServices: VehicleReceptionService,
              public sanitizer: DomSanitizer,
  ) {
    console.log(this.data)
  }

  public updatePreviewPrinter(event: any) {
    // this.sanitizer.bypassSecurityTrustUrl()
    this.vehicleReceptionServices.print(this.data.vehicleReceptionId, this.withPhotos?1:0, this.withPrices?1:0).subscribe(
      (pdfFile) => {
        this.data.pdfFile = pdfFile.replace('"', '').replace('"', '')
        this.pdfViewer.lastLoaded = undefined;
        this.pdfViewer.pdfSrc = this.data.pdfFile; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh();
        // this.pdfViewer.update();

      }
    );
  }

  public cleanUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

