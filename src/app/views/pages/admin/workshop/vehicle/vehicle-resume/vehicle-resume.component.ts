import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LayoutConfigService, MenuOptions, OffcanvasOptions} from '../../../../../../core/_base/layout';
import {FormGroup} from '@angular/forms';
import {
  Client,
  ClientService,
  Company,
  CompanyService,
  PhotoService,
  Vehicle,
  VehicleList,
  VehicleService
} from '../../../../../../core/admin';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {environment} from '../../../../../../../environments/environment';
import {SweetAlertOptions} from "sweetalert2";
import {CompanyVehicleService} from '../../../../../../core/admin/_services/company-vehicle.service';
import {ClientVehicleService} from '../../../../../../core/admin/_services/client-vehicle.service';

@Component({
  selector: 'kt-vehicle-resume',
  templateUrl: './vehicle-resume.component.html',
  styleUrls: ['./vehicle-resume.component.scss']
})
export class VehicleResumeComponent implements OnInit {
  // PHOTO Variables
  public pondFiles = [];
  public lastFileAdd = null;
  public photoError: string;
  public pondOptions = this.optionsFile();
  @ViewChild('myPond', { static: false }) myPond: any;

  @ViewChild('photoModal', {static: false}) private photoModal: SwalComponent;
  public addPhotoModalOption: SweetAlertOptions;

  @ViewChild('deleteModal', {static: false}) private deleteModal: SwalComponent;
  public deleteModalOption: SweetAlertOptions;


  public insideTm: any;
  public outsideTm: any;
  public urlImages = environment.urlImages;


  public menuCanvasOptions: OffcanvasOptions = {
    baseClass: 'kt-aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggler',
      state: 'kt-header-mobile__toolbar-toggler--active'
    }
  };
  // public historyModalOption = {
  //   showCancelButton: true,
  //   cancelButtonText: 'OK',
  //   // confirmButtonColor: '#5d78ff',
  //   // confirmButtonText: 'Eliminar',
  //   // confirmButtonClass: 'btn btn-primary btn-elevate',
  //   cancelButtonClass: 'btn btn-secondary btn-elevate',
  //   // showLoaderOnConfirm: true,
  //   focusCancel: true
  //   // preConfirm: () => this.deleteClien   t(this.clientSelected)
  // };
  public menuOptions: MenuOptions = {
    // vertical scroll
    scroll: null,
    // submenu setup
    submenu: {
      desktop: {
        // by default the menu mode set to accordion in desktop mode
        default: 'dropdown',
      },
      tablet: 'accordion', // menu set to accordion in tablet mode
      mobile: 'accordion' // menu set to accordion in mobile mode
    },

    // accordion setup
    accordion: {
      expandAll: false // allow having multiple expanded accordions in the menu
    }
  };
  public loading = false;
  public errors: any = [];
  public list: VehicleList;
  public searchList: VehicleList;
  public vehicle: Vehicle;
  public vehiclePhoto: any;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.id'};
  // Search Vars
  public query = { q: '', q_id: '' };
  // @ViewChild('historyModal', {static: false}) private historyModal: SwalComponent;
  public works = [];
  // public client: Client;
  // public company: Company;
  public clientVehicleOwners: any[];
  public companyVehicleOwners: any[];

  constructor(
    private router: Router,
    private render: Renderer2,
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private companyService: CompanyService,
    private layoutConfigService: LayoutConfigService,
    private companyVehicleService: CompanyVehicleService,
    private clientVehicleService: ClientVehicleService
  ) {
    this.list = new VehicleList();
    this.vehicle = new Vehicle();
    // this.client = new Client();
    // this.company = new Company();
  }

  ngOnInit() {
    this.addPhotoModalOption = {
      title: 'Cambiar Foto',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Cambiar',
      confirmButtonClass: 'btn btn-primary btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.updatePhoto()
    };
    this.deleteModalOption = {
      title: 'Eliminar Vehiculo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#5d78ff',
      confirmButtonText: 'Eliminar',
      confirmButtonClass: 'btn btn-danger btn-elevate',
      cancelButtonClass: 'btn btn-secondary btn-elevate',
      showLoaderOnConfirm: true,
      focusCancel: true,
      preConfirm: () =>  this.deleteVehicle()
    };

    this.route.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        if (queryParams.page) {
          this.pagination.page = queryParams.page;
        }
        // if (queryParams.company_id) {
        //   this.getCompany(queryParams.company_id);
        // }
        // if (queryParams.client_id) {
        //   this.getClient(queryParams.client_id);
        // }
        if (queryParams.q_id) { // id car
          this.pagination.queryId = queryParams.q_id;
          this.getSingleVehicle(queryParams.q_id);
          this.getClientOwner(queryParams.q_id);
          this.getCompanyOwner(queryParams.q_id);
        } else {
          this.getVehicles();
        }
      });
    });
  }

  getVehicles() {
    this.vehicleService.all(this.pagination, false).subscribe(
      (list: VehicleList) => {
        if (list) {
          this.list = list;
          this.vehicle = this.list.list[0];
        }
      }
    );
  }

  getSingleVehicle(vehicleId: number) {
    this.vehicleService.get(vehicleId).subscribe(
      (vehicle: Vehicle) => {
        if (vehicle) {
          this.list = new VehicleList();
          this.list.list = [vehicle];
          this.list.pagination = {
            page: 1,
            total: 1
          };
          this.vehicle = this.list.list[0];
          Object.keys(this.vehicle.photos).forEach((key) => {
            if(this.vehicle.photos[key]['is_primary']) {
              this.vehiclePhoto = this.vehicle.photos[key];
              // Get owner

            }
          });
        }
      }
    );
  }

  getCompanyOwner(vehicleId: number) {
    this.companyVehicleService.findOwners(vehicleId).subscribe(
      (owners) => {
        if (owners) {
          this.companyVehicleOwners = owners;
          console.log(this.companyVehicleOwners)
        }
      }
    );
  }

  getClientOwner(vehicleId: number) {
    this.clientVehicleService.findOwners(vehicleId).subscribe(
      (owners) => {
        if (owners) {
          this.clientVehicleOwners = owners;
          console.log(this.clientVehicleOwners)
        }
      }
    );
  }

  changePage(paginator: any) {
    this.router.navigate(['/admin/workshop/vehicle'],
      { queryParams : { page : paginator.pageIndex + 1}});
  }

  /**
   * EVENTS from Search menu vehicle
   */
  searchVehicleSelected(vehicle: Vehicle) {
    if (vehicle) {
      this.searchList = new VehicleList();
      this.searchList.list = [vehicle];
      this.searchList.pagination = { page: 1, total: 1 };
      this.vehicle = vehicle;
    }
  }

  searchVehicleClear(clear: boolean) {
    this.searchList = null;
    this.vehicle = this.list.list[0];
  }

  /**
   * EVENTS from Vehicle porlent BODY
   */

  getVehicle(vehicleId: any) {
    this.vehicle = this.list.list.find((vehicle) => vehicle.id === +vehicleId);
  }

  updateVehicleInList(vehicle: Vehicle) {
    if (this.vehicle.id === vehicle.id) {
      this.vehicle = vehicle;
    }
  }

  /**
   *   EVENTS from DELETE Header
   */
  updateVehiclePageList($event) {
    this.pagination.page = this.list.pagination.page;
    this.vehicleService.all(this.pagination, false).subscribe(
      (list: VehicleList) => {
        if (list) {
          this.list = list;
          this.vehicle = this.list.list[0];
        }
      }
    );
  }

  searchVehicleId($event: Vehicle) {
    console.log($event);
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseEnter(e: Event) {
    // check if the left aside menu is fixed
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.outsideTm) {
        clearTimeout(this.outsideTm);
        this.outsideTm = null;
      }

      this.insideTm = setTimeout(() => {
        // if the left aside menu is minimized
        if (document.body.classList.contains('kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
          // show the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize');
          this.render.addClass(document.body, 'kt-aside--minimize-hover');
        }
      }, 50);
    }
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseLeave(e: Event) {
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.insideTm) {
        clearTimeout(this.insideTm);
        this.insideTm = null;
      }

      this.outsideTm = setTimeout(() => {
        // if the left aside menu is expand
        if (document.body.classList.contains('kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
          // hide back the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize-hover');
          this.render.addClass(document.body, 'kt-aside--minimize');
        }
      }, 100);
    }
  }

  // showHistory() {
  //   this.historyModal.fire().then((result) => {
  //     if (result.value) {
  //     }
  //   });
  // }

  getMomentObj(date) {
    return moment(date);
  }

  /**
   * PHOTO CRUD CONTROL
   */
  /**
   * Fire Open modal for update new photo
   * @param event
   */
  openPhotoModal(event: any) {
    this.photoModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
      } else {
        this.lastFileAdd = null;
        // After press "Cancel" button or leave from modal
      }
    });
  }
  openDeleteVehicleModal(event: any) {
    this.deleteModal.fire().then((result) => {
      if (result.value) {
        // After press "Ok" button
        this.router.navigate(['/admin/workshop/vehicle']);
      } else {
        // After press "Cancel" button or leave from modal
      }
    });
  }

  public updatePhoto() {
    if (this.lastFileAdd) {
      let response = this.photoService.post(this.vehicle, this.lastFileAdd, true); // Create new
      if (this.vehiclePhoto) { // Object type Photo seee python schemas
        response = this.photoService.put(this.vehiclePhoto['id'], this.vehicle, this.lastFileAdd, true); // Update
      }
      return new Promise((resolve, reject) => {
        response.subscribe(
          (photoObj) => {
            this.vehiclePhoto = photoObj;
            resolve();
          },
          error => reject()
        )
      });
    } else {
      this.photoError = 'Debe agregar una foto para cambiar';
      return false;
    }
  }

  public updateClient(vehicle: Vehicle) {

  }
  public deleteVehicle() {
    if (this.vehicle) {
      let response = this.vehicleService.delete(this.vehicle.id); // Create new
      return new Promise((resolve, reject) => {
        response.subscribe(
          (response) => {
            resolve();
          },
          error => reject()
        )
      });
    } else {
      this.photoError = 'El vehículo seleccionado es inválido';
      return false;
    }
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
          const formData = new FormData();
          formData.append('file', file, file.name);
          const request = new XMLHttpRequest();
          request.open('POST', environment.api_url + 'file/upload');
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

  /**
   * Remove File after upload document
   * @param event filepond event
   */
  public processFile(event: any) {
  }

  private requestOnLoad(load: any, request: any, error: any) {
    if (request.status >= 200 && request.status < 300) {
      this.lastFileAdd = request.responseText;
      load(request.responseText);
    } else {
      error('The service isn`t available');
    }
  }

}
