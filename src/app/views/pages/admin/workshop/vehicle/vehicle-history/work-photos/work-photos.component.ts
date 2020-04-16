import {Component, OnInit, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {HistoryService, ReceptionAccessoryService, VehicleService} from '../../../../../../../core/admin';
import {environment} from '../../../../../../../../environments/environment';
@Component({
  selector: 'kt-work-photos',
  templateUrl: './work-photos.component.html',
  styleUrls: ['./work-photos.component.scss']
})
export class WorkPhotosComponent implements OnInit, OnChanges {
  @Input() receptionId: number;
  public photoList = [];
  public pathImageServer = environment.urlImages;
  public readOnlyStatus = true;
  public vehicleAccessories = [];
  public receptionAccessoriesIds = [];
  public receptionAccessories = [];
  constructor(
    public dialog: MatDialog,
    public historyService: HistoryService,
    public vehicleService: VehicleService,
    public receptionAccessoriesService: ReceptionAccessoryService
  ) { }

  ngOnInit() {
  }
  openDialog(picture: string, note: string) {
    this.dialog.open(DialogCarPhotoDialog, {
      data: {
        picture: picture,
        note: note
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.receptionId) {
      this.receptionAccessoriesService.all(this.receptionId).subscribe(
        (receptionAccessories: any[]) => {
          Object.keys(receptionAccessories).forEach((key) => {
            this.receptionAccessoriesIds.push(receptionAccessories[key].vehicle_accesory);
            this.receptionAccessories.push(receptionAccessories[key]);
          });
          this.getAccessories();
        }
      );
      this.historyService.getPhotos(this.receptionId).subscribe(
        (photos) => {
          console.log(photos)
          this.photoList = photos;
        }
      );
    }
  }

  /**
   * ACCESSORIES CRUD CONTROL
   */
  public getAccessories() {
    this.vehicleService.accesories().subscribe(
      (vehicleAccessories) => {
        this.vehicleAccessories = vehicleAccessories;
      }
    );
  }
}


@Component({
  selector: 'dialog-car-photo-dialog',
  template: `
      <p>{{ data.note }}</p>
      <div mat-dialog-content >
          <img [src]="data.picture" class="img-fluid"/>

      </div>
	`,
})
export class DialogCarPhotoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
