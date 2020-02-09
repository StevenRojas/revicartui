import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LayoutConfigService, MenuOptions, OffcanvasOptions} from '../../../../../core/_base/layout';
import {FormGroup} from '@angular/forms';
import {Client, ClientList, ClientService, Company, CompanyService, Vehicle, VehicleList, VehicleService} from '../../../../../core/admin';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent, SwalPortalTargets} from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'kt-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  public insideTm: any;
  public outsideTm: any;
  public menuCanvasOptions: OffcanvasOptions = {
    baseClass: 'kt-aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggler',
      state: 'kt-header-mobile__toolbar-toggler--active'
    }
  };
  public historyModalOption = {
    showCancelButton: true,
    cancelButtonText: 'OK',
    // confirmButtonColor: '#5d78ff',
    // confirmButtonText: 'Eliminar',
    // confirmButtonClass: 'btn btn-primary btn-elevate',
    cancelButtonClass: 'btn btn-secondary btn-elevate',
    // showLoaderOnConfirm: true,
    focusCancel: true
    // preConfirm: () => this.deleteClient(this.clientSelected)
  };
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
  public registerVehicleForm: FormGroup;
  public list: VehicleList;
  public searchList: VehicleList;
  public vehicle: Vehicle;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.id'};
  // Search Vars
  public query = { q: '', q_id: '' };
  @ViewChild('historyModal', {static: false}) private historyModal: SwalComponent;
  public works = [];
  public client: Client;
  public company: Company;

  constructor(
    private render: Renderer2,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private companyService: CompanyService
  ) {
    this.list = new VehicleList();
    this.vehicle = new Vehicle();
    this.client = new Client();
    this.company = new Company();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        let detail = true;
        if (queryParams.page) {
          this.pagination.page = queryParams.page;
        }
        if (queryParams.q_id) {
          this.pagination.queryId = queryParams.q_id;
          detail = true;
        }
        if (queryParams.company_id) {
          this.getCompany(queryParams.company_id);
        }
        if (queryParams.client_id) {
          this.getClient(queryParams.client_id);
        }
        if (queryParams.q_id) {
          this.pagination.queryId = queryParams.q_id;
          detail = true;
        }
        // this.vehicleService.all(this.pagination, detail).subscribe(
        //   (list: VehicleList) => {
        //     if (list) {
        //       this.list = list;
        //       this.vehicle = this.list.list[0];
        //     }
        //   }
        // );
      });
    });
  }

  getClient(clientId: string) {
    this.clientService.get(clientId).subscribe(
      (client: Client) => {
        this.client = client;
      }
    );
  }

  getCompany(companyId: string) {
    this.companyService.get(companyId).subscribe(
      (company: Company) => {
        this.company = company;
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

  updateVehicleInList(vehicle: any) {
    Object.keys(this.list.list).forEach((key) => {
      if (this.list.list[key].id === vehicle.id) {
        this.list.list[key] = vehicle;
      }
    });
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

  showHistory() {
    this.historyModal.fire().then((result) => {
      if (result.value) {
      }
    });
  }

  getMomentObj(date) {
    return moment(date);
  }
}
