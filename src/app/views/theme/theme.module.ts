// import {NgxPermissionsModule} from 'ngx-permissions';
// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
// Angular Material
import {MatButtonModule, MatProgressBarModule, MatTabsModule, MatTooltipModule} from '@angular/material';
// NgBootstrap
import {NgbProgressbarModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Translation
import {TranslateModule} from '@ngx-translate/core';
// Loading bar
import {LoadingBarModule} from '@ngx-loading-bar/core';
// NGRX
// Ngx DatePicker
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
// Core Module
import {CoreModule} from '../../core/core.module';
import {PartialsModule} from '../partials/partials.module';
import {HtmlClassService} from './html-class.service';
import {BaseComponent} from './base/base.component';
import {HeaderMobileComponent} from './header/header-mobile/header-mobile.component';
import {BrandComponent} from './brand/brand.component';
import {TopbarComponent} from './header/topbar/topbar.component';
import {MenuHorizontalComponent} from './header/menu-horizontal/menu-horizontal.component';
import {HeaderComponent} from './header/header.component';
import {AsideLeftComponent} from './aside/aside-left.component';
import {SubheaderComponent} from './subheader/subheader.component';
import {FooterComponent} from './footer/footer.component';

// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import {AsideLeftComponent} from './aside/aside-left.component';


@NgModule({
  declarations: [
    BaseComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    HeaderComponent,
    AsideLeftComponent,
    SubheaderComponent,
    FooterComponent,
    // AsideLeftComponent
  ],
  exports: [
    BaseComponent,
    HeaderMobileComponent,
    BrandComponent,
    TopbarComponent,
    MenuHorizontalComponent,
    HeaderComponent,
    AsideLeftComponent,
    SubheaderComponent,
    FooterComponent,
    // AsideLeftComponent
  ],
  providers: [
    HtmlClassService,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    PerfectScrollbarModule,
    FormsModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule.forChild(),
    LoadingBarModule,
    NgxDaterangepickerMd,
    InlineSVGModule,
    // SweetAlert2Module,
    // ng-bootstrap modules
    NgbProgressbarModule,
    NgbTooltipModule,
    PartialsModule,
  ]
})
export class ThemeModule {
}
