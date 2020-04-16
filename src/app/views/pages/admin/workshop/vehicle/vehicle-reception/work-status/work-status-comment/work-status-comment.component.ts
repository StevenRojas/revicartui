import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from '../../../../../../../../../environments/environment';
import {DialogCarPhotoDialog} from '../../../vehicle-history/work-photos/work-photos.component';
import {MatDialog} from '@angular/material';
import {ReceptionPhotoService} from '../../../../../../../../core/admin';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'kt-work-status-comment',
  templateUrl: './work-status-comment.component.html',
  styleUrls: ['./work-status-comment.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => active', [ // using status here for transition
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WorkStatusCommentComponent implements OnInit {
  @Input() receptionPhoto: any;
  @Input() vehicleReceptionId: any;
  @Input() readOnlyStatus = true;
  @Output() removeReceptionPhotoEmitter = new EventEmitter<any>();
  @ViewChild('commentText', {static: true}) commentText: ElementRef;
  @ViewChild('deletePhotoModal', {static: false}) private deletePhotoModal: SwalComponent;
  public urlImages = environment.urlImages;
  public deletePhotoModalOption: SweetAlertOptions;
  public status: string;

  constructor(
    private dialog: MatDialog,
    private receptionPhotoService: ReceptionPhotoService
  ) { }

  ngOnInit() {
    fromEvent(this.commentText.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text) => {
      this.receptionPhotoService.update(this.vehicleReceptionId, this.receptionPhoto.id, text).subscribe(
        (response) => {
          console.log(response)
        }
      );
    });

    this.deletePhotoModalOption = {
      title: 'Advertencia',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Eliminar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      type: 'warning',
      focusCancel: true,
      preConfirm: () =>  this.removeReceptionPhoto()
    };
  }
  public openDeleteModal() {
    this.deletePhotoModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }
  public openDialog(picture: string) {
    this.dialog.open(DialogCarPhotoDialog, {
      data: {
        picture: picture
      },
      maxHeight: '750px'
    });
  }

  public removeReceptionPhoto() {
    this.receptionPhotoService.delete(this.vehicleReceptionId, this.receptionPhoto.id).subscribe(
      (response) => {
        this.removeReceptionPhotoEmitter.emit(this.receptionPhoto);
      }
    );
  }

  public deletePhoto() {

  }
}
