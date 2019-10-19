import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// General widgets
import {WidgetClientListComponent} from './admin/widget-client-list/widget-client-list.component';

import {CoreModule} from '../../../../core/core.module';
import {WidgetCompanyListComponent} from './admin/widget-company-list/widget-company-list.component';
import {WidgetVehicleListComponent} from './admin/widget-vehicle-list/widget-vehicle-list.component';


@NgModule({
  declarations: [
    WidgetClientListComponent,
    WidgetCompanyListComponent,
    WidgetVehicleListComponent,
  ],
  exports: [
    WidgetClientListComponent,
    WidgetCompanyListComponent,
    WidgetVehicleListComponent,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    MatTableModule,
    CoreModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule
  ]
})
export class WidgetModule {
}
