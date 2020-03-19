import {Component, ElementRef, Inject, Input, OnChanges, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FileService, PhotoService, ReceptionAccessoryService, ReceptionPhotoService, VehicleService} from '../../../../../../../core/admin';
import {isNumeric} from 'rxjs/internal-compatibility';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';
import {environment} from '../../../../../../../../environments/environment';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCarPhotoDialog} from '../../vehicle-history/work-photos/work-photos.component';
import {AuthService} from '../../../../../../../core/auth/_services';

@Component({
  selector: 'kt-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.scss']
})
export class WorkStatusComponent implements OnInit, OnChanges {
  @ViewChild('myPond', { static: false }) myPond: any;
  @ViewChild('addPhotoModal', {static: false}) private addPhotoModal: SwalComponent;
  @ViewChild('receptionPhotoNoteInput', {static: false}) private receptionPhotoNoteInput: ElementRef;
  @Input() vehicleReception: any;
  @Input() readOnlyStatus = true;
  public pondFiles = [];
  public lastFileAdd = [];
  public lastNoteAdd = null;

  public fileSubmitted = false; // Control for remove file from server or not
  public addPhotoModalOption: SweetAlertOptions;
  public vehicleAccessories: any[];

  // Update this vars on create new
  public receptionAccessoriesIds: any[];
  public receptionAccessories: any[];
  public receptionPhotos: any[];
  public receptionPhotoError: string;
  public pondOptions = this.optionsFile();


  public urlImages = environment.urlImages;
  constructor(
    private vehicleService: VehicleService,
    private receptionAccessoriesService: ReceptionAccessoryService,
    private render: Renderer2,
    private photoService: PhotoService,
    private receptionPhotoService: ReceptionPhotoService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.addPhotoModalOption = {
      title: 'Agregar Foto',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Agregar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.addPhoto()
    };
    this.vehicleAccessories = [];
    this.getAccessories();

  }

  /**
   * Update the view and controls
   * @param changes
   */
  ngOnChanges(changes) {
    if (this.vehicleReception && this.vehicleReception.id) {
      this.receptionAccessoriesIds = [];
      this.receptionAccessories = [];
      this.loadReceptionAccessories();
      this.receptionPhotos = [];
      this.loadReceptionPhotos();
    }
  }

  public loadReceptionPhotos() {
    this.receptionPhotoService.all(this.vehicleReception.id).subscribe(
      (receptionPhotosObj) => {
        this.receptionPhotos = receptionPhotosObj;
      }
    );
  }

  /**
   * Load the current accessories listed for all vehicles
   */
  public loadReceptionAccessories() {
    this.receptionAccessoriesService.all(this.vehicleReception.id).subscribe(
      (receptionAccessories: any[]) => {
        Object.keys(receptionAccessories).forEach((key) => {
          this.receptionAccessoriesIds.push(receptionAccessories[key].vehicle_accesory);
          this.receptionAccessories.push(receptionAccessories[key]);
        });
        this.getAccessories();
      }
    );
  }

  /**
   * ACCESSORIES CRUD CONTROL
   */
  getAccessories() {
    this.vehicleService.accesories().subscribe(
      (vehicleAccessories) => {
        this.vehicleAccessories = vehicleAccessories;
      }
    );
  }

  /**
   * Create or remove accessorie using checkbox control
   * @param event
   * @param receptionAccessoryKey
   * @param elQuantity
   * @param vehicleAccesoryId
   */
  createOrRemoveAccessory(event, receptionAccessoryKey, elQuantity, vehicleAccesoryId) {
    if (receptionAccessoryKey === -1) {
      if (!event.checked) {
        this.render.setValue(elQuantity, '1');
        elQuantity.value = 1;
      } else {
        this.createAccessory(this.vehicleReception.id, parseInt(vehicleAccesoryId, 10), parseInt(elQuantity.value, 10));
      }
    } else {
      if (!event.checked) {
        this.removeAccessory(receptionAccessoryKey);
      }
    }
  }

  /**
   * Update Category using enter or tab keyword on input field
   * @param quantity
   * @param receptionAccessoryKey
   * @param elChecked
   */
  updateAccessoryInput(quantity: number, receptionAccessoryKey, elChecked) {
    if (elChecked.checked) {
      // Update
      if (isNumeric(quantity)) {
        this.receptionAccessoriesService.update(
          parseInt(this.receptionAccessories[receptionAccessoryKey]['id'], 10),
          this.vehicleReception.id,
          quantity).subscribe(
          (receptionAccessory) => {
            console.log(receptionAccessory);
          }
        );
      }
    }
  }

  /**
   * Prepare request for create accessory
   * @param vehicleReceptionId
   * @param vehicleAccessoryId
   * @param quantity
   */
  createAccessory(vehicleReceptionId: number, vehicleAccessoryId: number, quantity: number) {
    console.log(vehicleReceptionId, vehicleAccessoryId, quantity)
    this.receptionAccessoriesService.add(vehicleReceptionId, vehicleAccessoryId, quantity).subscribe(
      (receptionAccessory: any) => {
        this.receptionAccessoriesIds.push(receptionAccessory.vehicle_accesory);
        this.receptionAccessories.push(receptionAccessory);
      }
    );
  }

  /**
   * Prepare request for remove accessorie, fire when uncheck the checkbox
   * @param receptionAccessoryKey
   */
  removeAccessory(receptionAccessoryKey) {
    this.receptionAccessoriesService.remove(parseInt(this.receptionAccessories[receptionAccessoryKey]['id'], 10),
      this.vehicleReception.id).subscribe(
      (result) => {
        delete this.receptionAccessoriesIds[receptionAccessoryKey];
        delete this.receptionAccessories[receptionAccessoryKey];
      }
    );
  }

  /**
   * PHOTO CRUD CONTROL
   */
  /**
   * Fire Open modal for add new reception_photo row
   * @param event
   */
  openAddPhotoModal(event: any) {
    this.addPhotoModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        this.lastFileAdd = [];
        this.lastNoteAdd = null;
        // After press "Cancel" button or leave from modal
      }
    });
  }


  public addPhoto() {
    const response = this.photoService.post(this.vehicleReception.vehicle, this.lastFileAdd, false);
    this.lastNoteAdd = this.receptionPhotoNoteInput.nativeElement.value;
    if(this.lastNoteAdd || this.lastFileAdd) {
      return new Promise((resolve, reject) => {
        if(this.lastFileAdd && this.lastFileAdd != null && this.lastFileAdd.length == 0) {
          response.subscribe(
            (photoObj) => {
              this.receptionPhotoService.add(photoObj.id, this.vehicleReception.id, this.lastNoteAdd).subscribe(
                (receptionPhotoObj) => {
                  this.receptionPhotos = [receptionPhotoObj, ...this.receptionPhotos];
                }
              );
              resolve();
            },
            error => reject()
          )
        } else {
          this.receptionPhotoService.add(null, this.vehicleReception.id, this.lastNoteAdd).subscribe(
            (receptionPhotoObj) => {
              this.receptionPhotos = [receptionPhotoObj, ...this.receptionPhotos];
              resolve();
            },
            error => reject()
          );
        }

      });
    } else {
      this.receptionPhotoError = "Debe al menos o subir una Foto o agregar una Nota";
      return false;
    }
  }
  /**
   * Configuration uploader
   *  @return configuration filepond
   */
  public optionsFile() {
    const token = this.authService.getUser();
    return {
      class: 'poi-file_uploader',
      multiple: true,
      labelIdle: 'Arrastre y suelte los archivos aquí o puede  <a class="link"> buscarlos </a>',
      acceptedFileTypes: 'image/*',
      instantUpload: true,
      maxFileSize: '5MB',
      allowRevert: false,
      server: {
          headers: {
            Authorization: `Bearer ${token}`,
            token: token
          },
        // ADD endpoit for upload photo
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            const formData = new FormData();
            formData.append('file', file, file.name);
            const request = new XMLHttpRequest();
            request.open('POST', environment.api_url + 'file/upload');
            request.setRequestHeader('Authorization', `Bearer ${token}`);
            request.setRequestHeader('token', token);
            request.upload.onprogress = (e) => {
              progress(e.lengthComputable, e.loaded, e.total);
            };
            request.onload = () => {
              this.requestOnLoad(load, request, error);
            };
            request.send(formData);
            return {
              abort: () => {
                request.abort();
                abort();
              }
            };
        },
        revert: false
      },
      onremovefile: (error, file) => {
        // Use this method for remove file after upload, remove from server
        console.log(error, file);
      }
    };
  }

  private requestOnLoad(load: any, request: any, error: any) {
    if (request.status >= 200 && request.status < 300) {
      this.lastFileAdd.push(request.responseText);
      load(request.responseText);
    } else {
      error('The service isn`t available');
    }
  }

  /**
   * Remove File after upload document
   * @param event filepond event
   */
  public processFile(event: any) {
    // setTimeout(() => {
    //   this.myPond.removeFile(event.file.id);
    // }, 1000);
  }

    public removeFile(fileId) {
    if (!this.fileSubmitted) {
      alert('File removed');
    }
  }
 public removeReceptionPhotoItem(receptionPhoto: any, key: number) {
    console.log(receptionPhoto, key)
    this.receptionPhotos.splice(key, 1);
 }
}
