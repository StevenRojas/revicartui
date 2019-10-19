// Angular
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Core module
import {CoreModule} from '../../core/core.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
} from '@angular/material';
// NgBootstrap
import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Layout partials
import {
  ClientHeaderComponent,
  ClientNoteItemComponent,
  CompanyHeaderComponent,
  CompanyNoteItemComponent,
  ContextMenuClientComponent,
  ContextMenuCompanyComponent, ContextMenuVehicleComponent,
  LanguageSelectorComponent,
  SearchClientResultComponent,
  SearchClientTopMenuComponent,
  SearchCompanyResultComponent,
  SearchCompanyTopMenuComponent,
  SearchResultComponent,
  SearchTopMenuComponent, SearchVehicleResultComponent, SearchVehicleTopMenuComponent,
  SplashScreenComponent,
  Subheader6Component,
  UserProfile2Component,
  VehicleHeaderComponent
} from './layout';

// General
import {PortletModule} from './content/general/portlet/portlet.module';

import {PortletClientModule} from './content/general/portlet-client/portlet-client.module';
// Extra module
import {WidgetModule} from './content/widgets/widget.module';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
// Error
import {ErrorComponent} from './content/general/error/error.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// Core module
// import {CoreModule} from '../../core/core.module';


@NgModule({
  declarations: [
    SplashScreenComponent,
    LanguageSelectorComponent,
    UserProfile2Component,
    Subheader6Component,
    ErrorComponent,
    ContextMenuClientComponent,
    SearchTopMenuComponent,
    SearchClientTopMenuComponent,
    SearchResultComponent,
    SearchClientResultComponent,
    // Client
    ClientHeaderComponent,
    ClientNoteItemComponent,
    // Company
    CompanyHeaderComponent,
    CompanyNoteItemComponent,
    ContextMenuCompanyComponent,
    SearchCompanyResultComponent,
    SearchCompanyTopMenuComponent,
    // Vehicles
    VehicleHeaderComponent,
    ContextMenuVehicleComponent,
    SearchVehicleResultComponent,
    SearchVehicleTopMenuComponent,
  ],
  exports: [
    SplashScreenComponent,
    LanguageSelectorComponent,
    UserProfile2Component,
    Subheader6Component,
    ErrorComponent,
    PortletClientModule,
    ContextMenuClientComponent,
    SearchTopMenuComponent,
    SearchClientTopMenuComponent,
    SearchResultComponent,
    SearchClientResultComponent,
    // Client
    ClientHeaderComponent,
    ClientNoteItemComponent,
    // Company
    CompanyHeaderComponent,
    CompanyNoteItemComponent,
    ContextMenuCompanyComponent,
    SearchCompanyResultComponent,
    SearchCompanyTopMenuComponent,
    // Vehicles
    VehicleHeaderComponent,
    ContextMenuVehicleComponent,
    SearchVehicleResultComponent,
    SearchVehicleTopMenuComponent,
    WidgetModule,
    PortletModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    CoreModule,
    PortletClientModule,
    InlineSVGModule,
    // angular material modules
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    SweetAlert2Module,
    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    WidgetModule,
    PortletModule
  ]
})
export class PartialsModule {
}
