// Angular
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig, MatProgressSpinnerModule} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';

// Perfect Scroll bar
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

// Guard
import { AuthGuard } from './core/auth';

// Partials
import {PartialsModule} from './views/partials/partials.module';
// Layout Services
import {
  LayoutConfigService, SplashScreenService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
  PageConfigService,
  SubheaderService, KtDialogService
} from './core/_base/layout';
// Config
import {LayoutConfig} from './core/_config/layout.config';
import {TestComponent} from './views/pages/test/test.component';

// Core
import {CoreModule} from './core/core.module';
import {ThemeModule} from './views/theme/theme.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Auth
import { AuthModule } from './views/pages/auth/auth.module';

// Admin
import {AdminModule} from './views/pages/admin/admin.module';
import {JwtInterceptorService} from './core/_base/crud';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartialsModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    OverlayModule,
    AdminModule,
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AuthModule.forRoot()
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService,
    //   multi: true
    // },
    LayoutConfigService,
    LayoutRefService,
    MenuAsideService,
    MenuConfigService,
    MenuHorizontalService,
    PageConfigService,
    SubheaderService,
    SplashScreenService,
    KtDialogService,
    AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService], multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
