import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'kt-work-photos',
  templateUrl: './work-photos.component.html',
  styleUrls: ['./work-photos.component.scss']
})
export class WorkPhotosComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  openDialog(picture: string) {
    this.dialog.open(DialogCarPhotoDialog, {
      data: {
        picture: picture
      }
    });
  }
}


@Component({
  selector: 'dialog-car-photo-dialog',
  template: `    
      <div mat-dialog-content >
          <img [src]="data.picture" class="img-fluid"/>
      </div>
	`,
})
export class DialogCarPhotoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
