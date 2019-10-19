import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkshopComponent} from './workshop/workshop.component';

const routes: Routes = [
  {
    path: 'workshop',
    component: WorkshopComponent,
    loadChildren: () => import('./workshop/workshop.module').then(m => m.WorkshopModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
