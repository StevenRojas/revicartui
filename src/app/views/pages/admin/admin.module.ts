import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { WorkshopModule } from './workshop/workshop.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptorService} from '../../../core/_base/crud';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    WorkshopModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class AdminModule { }
