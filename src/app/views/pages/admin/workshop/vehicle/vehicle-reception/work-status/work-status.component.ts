import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ReceptionAccessoryService, VehicleService} from '../../../../../../../core/admin';
import {isNumeric} from 'rxjs/internal-compatibility';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from "sweetalert2";

@Component({
  selector: 'kt-work-status',
  templateUrl: './work-status.component.html',
  styleUrls: ['./work-status.component.scss']
})
export class WorkStatusComponent implements OnInit {
  @ViewChild('addPhotoModal', {static: false}) private addPhotoModal: SwalComponent;
  @ViewChild('myPond', { static: false }) myPond: any;

  public pondFiles = [];
  public lastFileAdd = {};
  public fileSubmitted = false; // Control for remove file from server or not

  public addPhotoModalOption: SweetAlertOptions;
  @Input() vehicleReceptionId: number;
  public vehicleAccessories: any[];
  // Update this vars on create new
  public receptionAccessoriesIds: any[];
  public receptionAccessories: any[];
  public pondOptions = this.optionsFile();

  constructor(
    private vehicleService: VehicleService,
    private receptionAccessoriesService: ReceptionAccessoryService,
    private render: Renderer2
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
      // preConfirm: () =>  this.addClient()
    };
    this.vehicleAccessories = [];
    this.receptionAccessoriesIds = [];
    this.receptionAccessories = [];
    if (this.vehicleReceptionId) {
      this.receptionAccessoriesService.all(this.vehicleReceptionId).subscribe(
        (receptionAccessories: any[]) => {
          Object.keys(receptionAccessories).forEach((key) => {
            this.receptionAccessoriesIds.push(receptionAccessories[key].vehicle_accesory);
            this.receptionAccessories.push(receptionAccessories[key]);
          });
          this.getAccessories();
        }
      );
    } else {
      this.getAccessories();
    }
  }

  getAccessories() {
    this.vehicleService.accesories().subscribe(
      (vehicleAccessories) => {
        this.vehicleAccessories = vehicleAccessories;
      }
    );
  }

  updateAccessory(event, receptionAccessoryKey, elQuantity, vehicleAccesoryId) {
    if (receptionAccessoryKey === -1) {
      if (!event.checked) {

        this.render.setValue(elQuantity, '1');
        elQuantity.value = 1;
      } else {
        this.createAccessory(this.vehicleReceptionId, parseInt(vehicleAccesoryId, 10), parseInt(elQuantity.value, 10));
      }
    } else {
      if (!event.checked) {
        this.removeAccessory(receptionAccessoryKey);
      }
    }
  }

  updateAccessoryInput(quantity: number, receptionAccessoryKey, elChecked) {
    if (elChecked.checked) {
      // Update
      if (isNumeric(quantity)) {
        this.receptionAccessoriesService.update(
          parseInt(this.receptionAccessories[receptionAccessoryKey]['id'], 10),
          this.vehicleReceptionId,
          quantity).subscribe(
          (receptionAccessory) => {
            console.log(receptionAccessory);
          }
        );
      }
    }
  }

  createAccessory(vehicleReceptionId: number, vehicleAccessoryId: number, quantity: number) {
    console.log(vehicleReceptionId, vehicleAccessoryId, quantity)
    this.receptionAccessoriesService.add(vehicleReceptionId, vehicleAccessoryId, quantity).subscribe(
      (receptionAccessory: any) => {
        this.receptionAccessoriesIds.push(receptionAccessory.vehicle_accesory);
        this.receptionAccessories.push(receptionAccessory);
      }
    );
  }

  removeAccessory(receptionAccessoryKey) {
    this.receptionAccessoriesService.remove(parseInt(this.receptionAccessories[receptionAccessoryKey]['id'], 10),
      this.vehicleReceptionId).subscribe(
      (result) => {
        delete this.receptionAccessoriesIds[receptionAccessoryKey];
        delete this.receptionAccessories[receptionAccessoryKey];
      }
    );
  }

  openAddPhotoModal(event: any) {
    this.addPhotoModal.fire().then((result) => {
      if (result.value) {
        // TODO send result
      } else {
        alert('Close modal');
      }
    });
  }

  /**
   * Configuration uploader
   *  @return configuration filepond
   */
  public optionsFile() {
    return {
      class: 'poi-file_uploader',
      multiple: false,
      labelIdle: 'Arrastre y suelte los archivos aquí o puede  <a class="link"> buscarlos </a>',
      acceptedFileTypes: 'image/*',
      instantUpload: false,
      maxFileSize: '5MB',
      allowRevert: false,
      server: {
        // ADD endpoit for upload photo
          process: (fieldName, file, metadata, load, error, progress, abort) => {
          // this.jobDetailService.createFile(this.jobId, file).subscribe(
          //   createFileResponse => {
          //     const formData = new FormData();
          //     formData.append('asset', file, file.name);
          //     const request = new XMLHttpRequest();
          //     request.open('POST', createFileResponse.upload_url);
          //     request.upload.onprogress = (e) => {
          //       progress(e.lengthComputable, e.loaded, e.total);
          //     };
          //     request.onload = () => {
          //       this.requestOnLoad(load, request, error);
          //     };
          //     request.send(formData);
          //     return {
          //       abort: () => {
          //         request.abort();
          //         abort();
          //       }
          //     };
          //   }
          // );
        },
        revert: false
      },
      onremovefile: (error, file) => {
        // Use this method for remove file after upload, remove from server
        console.log(error, file);
      }
    };
  }

  /**
   * Remove File after upload document
   * @param event filepond event
   */
  public processFile(event: any) {
    setTimeout(() => {
      this.myPond.removeFile(event.file.id);
    }, 1000);
  }

    public removeFile(fileId) {
    if (!this.fileSubmitted) {
      alert('File removed');
    }
  }
}
