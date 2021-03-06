import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './client/client.component';
import {CompanyComponent} from './company/company.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {VehicleResumeComponent} from './vehicle/vehicle-resume/vehicle-resume.component';
import {ReceptionComponent} from './reception/reception.component';

const routes: Routes = [
  {
    path: '',
    component: ReceptionComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'client/:id',
    component: ClientComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'company/:id',
    component: CompanyComponent
  },
  {
    path: 'vehicle',
    component: VehicleComponent
  },
  {
    path: 'vehicle/:id',
    component: VehicleResumeComponent
  },
  {
    path: 'reception',
    component: ReceptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
