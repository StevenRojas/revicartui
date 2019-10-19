// Angular
import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
// RxJS
import {Subscription} from 'rxjs';
// Layout
import {LayoutConfigService, MenuAsideService, MenuOptions, OffcanvasOptions, SubheaderService} from '../../../../../core/_base/layout';
import {Breadcrumb} from '../../../../../core/_base/layout/services/subheader.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import * as objectPath from 'object-path';
import {HtmlClassService} from '../../../../theme/html-class.service';

@Component({
  selector: 'kt-subheader6',
  templateUrl: './subheader6.component.html',
  styleUrls: ['./subheader6.component.scss']
})
export class Subheader6Component implements OnInit, OnDestroy, AfterViewInit {
  // Public properties
  @Input() fluid: boolean;
  @Input() clear: boolean;
  // @ViewChild('asideMenu', {static: true}) asideMenu: ElementRef;
  subItems = [];
  itemMenu: any;
  today = Date.now();
  title = '';
  desc = '';
  breadcrumbs: Breadcrumb[] = [];

  // Private properties
  private subscriptions: Subscription[] = [];
  currentRouteUrl = '';

  menuOptions: MenuOptions = {
    submenu: {
      desktop: 'dropdown',
      tablet: 'accordion',
      mobile: 'accordion'
    },
    accordion: {
      slideSpeed: 200, // accordion toggle slide speed in milliseconds
      expandAll: false // allow having multiple expanded accordions in the menu
    }
  };

  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'kt-header-menu-wrapper',
    closeBy: 'kt_header_menu_mobile_close_btn',
    toggleBy: {
      target: 'kt_header_mobile_toggler',
      state: 'kt-header-mobile__toolbar-toggler--active'
    }
  };
  /**
   * Component constructor
   *
   **/
  constructor(
      public layoutConfigService: LayoutConfigService,
      public subheaderService: SubheaderService,
      public htmlClassService: HtmlClassService,
      public menuAsideService: MenuAsideService,
      private cdr: ChangeDetectorRef,
      private render: Renderer2,
      private router: Router,
) { }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
    const splitCurrentRouteUrl = this.currentRouteUrl.split('/');
    const item = splitCurrentRouteUrl[1];
    const subItem = splitCurrentRouteUrl[2] ? splitCurrentRouteUrl[2] : false;
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(event => {
          this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
          this.cdr.markForCheck();
        });
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
      // breadcrumbs title sometimes can be undefined
      if (bt) {
        Promise.resolve(null).then(() => {
          this.title = bt.title;
          this.desc = bt.desc;
        });
      }
    }));

    this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
      Promise.resolve(null).then(() => {
        this.breadcrumbs = bc;
      });
    }));
  }

  /**
   * Mouse Leave event
   * @param event: MouseEvent
   */
  mouseLeave(event: MouseEvent) {
    this.render.removeClass(event.target, 'kt-menu__item--hover');
  }

  /**
   * Use for fixed left aside menu, to show menu on mouseenter event.
   * @param e Event
   */
  mouseEnter(e: Event) {
    // check if the left aside menu is fixed
    if (!document.body.classList.contains('kt-menu__item--hover')) {
      this.render.addClass(document.body, 'kt-menu__item--hover');
    }
  }

  /**
   * Return Css Class Name
   * @param item: any
   */
  getItemCssClasses(item) {
    let classes = 'kt-menu__item';

    if (objectPath.get(item, 'submenu')) {
      classes += ' kt-menu__item--submenu';
    }

    if (!item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' kt-menu__item--active kt-menu__item--here';
    }

    if (item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' kt-menu__item--open kt-menu__item--here';
    }

    if (objectPath.get(item, 'resizer')) {
      classes += ' kt-menu__item--resize';
    }

    const menuType = objectPath.get(item, 'submenu.type') || 'classic';
    if ((objectPath.get(item, 'root') && menuType === 'classic')
        || parseInt(objectPath.get(item, 'submenu.width'), 10) > 0) {
      classes += ' kt-menu__item--rel';
    }

    const customClass = objectPath.get(item, 'custom-class');
    if (customClass) {
      classes += ' ' + customClass;
    }

    if (objectPath.get(item, 'icon-only')) {
      classes += ' kt-menu__item--icon-only';
    }

    return classes;
  }

  /**
   * Check Menu is active
   * @param item: any
   */
  isMenuItemIsActive(item): boolean {
    if (item.submenu) {
      return this.isMenuRootItemIsActive(item);
    }

    if (!item.page) {
      return false;
    }

    return this.currentRouteUrl.indexOf(item.page) !== -1;
  }

  /**
   * Check Menu Root Item is active
   * @param item: any
   */
  isMenuRootItemIsActive(item): boolean {
    if (item.submenu.items) {
      for (const subItem of item.submenu.items) {
        if (this.isMenuItemIsActive(subItem)) {
          return true;
        }
      }
    }

    if (item.submenu.columns) {
      for (const subItem of item.submenu.columns) {
        if (this.isMenuItemIsActive(subItem)) {
          return true;
        }
      }
    }

    if (typeof item.submenu[Symbol.iterator] === 'function') {
      for (const subItem of item.submenu) {
        const active = this.isMenuItemIsActive(subItem);
        if (active) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
