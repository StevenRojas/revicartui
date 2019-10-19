import {Component, OnInit, Renderer2} from '@angular/core';
import {Client, ClientList, ClientService, CompanyList} from '../../../../../core/admin';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuOptions, OffcanvasOptions, LayoutConfigService} from '../../../../../core/_base/layout';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'kt-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

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
  public registerClientForm: FormGroup;
  public list: ClientList;
  public searchList: ClientList;
  public client: Client;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'client.id'};
  // Search Vars
  public query = { q: '', q_id: '' };
  public forceSearch = '';

  constructor(
    private render: Renderer2,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {
    this.list = new ClientList();
    this.client = new Client();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.getList(queryParams);
      });
    });
  }

  changePage(paginator: any) {
    this.router.navigate(['/admin/workshop/client'],
      { queryParams : { page : paginator.pageIndex + 1}});
  }

  /**
   * EVENTS from Search menu client
   */
  searchClientSelected(client: Client) {
    if (client) {
      this.searchList = new ClientList();
      this.searchList.list = [client];
      this.searchList.pagination = { page: 1, total: 1 };
      this.client = client;
    }
  }

  searchClientClear(clear: boolean) {
    this.searchList = null;
    this.router.navigate(['/admin/workshop/client'],
      {queryParams: {}});
    if (this.list.list.length === 1) {
      this.pagination.queryId = null;
      this.clientService.all(this.pagination).subscribe(
        (list: ClientList) => {
          if (list) {
            this.list = list;
            this.client = this.list.list[0];
          }
        });
    } else {
      this.client = this.list.list[0];
    }
  }
  public getList(queryParams) {
    if (queryParams.page) {
      this.pagination.page = queryParams.page;
    }
    if (queryParams.q_id) {
      this.pagination.queryId = queryParams.q_id;
    }
    this.clientService.all(this.pagination).subscribe(
      (list: ClientList) => {
        if (list) {
          this.list = list;
          this.client = this.list.list[0];
          if (queryParams.q_id) {
            this.forceSearch = this.client.name;
          }
        }
      }
    );
  }
  /**
   * EVENTS from Client porlent BODY
   */

  getClient(clientId: any) {
    this.client = this.list.list.find((client) => client.id === +clientId);
  }

  updateClientInList(client: any) {
    Object.keys(this.list.list).forEach((key) => {
      if (this.list.list[key].id === client.id) {
        this.list.list[key] = client;
      }
    });
  }

  /**
   *   EVENTS from DELETE Header
   */
  updateClientPageList($event) {
    this.pagination.page = this.list.pagination.page;
    this.clientService.all(this.pagination).subscribe(
      (list: ClientList) => {
        if (list) {
          this.list = list;
          this.client = this.list.list[0];
        }
      }
    );
  }

  searchClientId(client: Client) {
    this.router.navigate(['/admin/workshop/client'],
      { queryParams : { q_id : client.id}});
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

}
