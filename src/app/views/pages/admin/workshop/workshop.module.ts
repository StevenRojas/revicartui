import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkshopRoutingModule} from './workshop-routing.module';
import {WorkshopComponent} from './workshop.component';
import {ClientComponent} from './client/client.component';
import {ClientEditComponent} from './client/client-edit/client-edit.component';
import {CompanyComponent} from './company/company.component';
import {CoreModule} from '../../../../core/core.module';
import {PartialsModule} from '../../../partials/partials.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule, MatDatepickerModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {ClientNoteComponent} from './client/client-note/client-note.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {ClientVehicleComponent} from './client/client-vehicle/client-vehicle.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyNoteComponent } from './company/company-note/company-note.component';
import { CompanyVehicleComponent } from './company/company-vehicle/company-vehicle.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    WorkshopComponent, ClientComponent, ClientEditComponent, CompanyComponent, ClientNoteComponent, VehicleComponent,
    ClientVehicleComponent, ClientVehicleComponent, CompanyEditComponent, CompanyNoteComponent, CompanyVehicleComponent],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    CoreModule,
    PartialsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    SweetAlert2Module,
    FormsModule
  ]
})
export class WorkshopModule {
}
