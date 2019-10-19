// Angular
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// Loading bar
import {LoadingBarService} from '@ngx-loading-bar/core';
// RxJS
import {Observable} from 'rxjs';
// Portlet
import {PortletClientBodyComponent} from './portlet-client-body.component';
import {PortletClientHeaderComponent} from './portlet-client-header.component';
import {PortletClientFooterComponent} from './portlet-client-footer.component';
// Layout
import {LayoutConfigService} from '../../../../../core/_base/layout';

export interface PortletOptions {
  test?: any;
}

@Component({
  selector: 'kt-portlet-client',
  templateUrl: './portlet-client.component.html',
  exportAs: 'ktPortletClient'
})
export class PortletClientComponent implements OnInit, AfterViewInit {
  // Public properties
  @Input() loading$: Observable<boolean>;
  // portlet extra options
  @Input() options: PortletOptions;
  // portlet root classes
  @Input() class: string;

  @ViewChild('portlet', {static: true}) portlet: ElementRef;

  // portlet header component template
  @ViewChild(PortletClientHeaderComponent, {static: true}) header: PortletClientHeaderComponent;
  // portlet body component template
  @ViewChild(PortletClientBodyComponent, {static: true}) body: PortletClientBodyComponent;
  // portlet footer component template
  @ViewChild(PortletClientFooterComponent, {static: true}) footer: PortletClientFooterComponent;

  /**
   * Component constructor
   *
   * @param el: ElementRef
   * @param loader: LoadingBarService
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(private el: ElementRef, public loader: LoadingBarService,
              private layoutConfigService: LayoutConfigService) {
    this.loader.complete();
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
  }

  /**
   * After view init
   */
  ngAfterViewInit() {
  }

}
