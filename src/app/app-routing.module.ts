import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './views/pages/test/test.component';
import {BaseComponent} from './views/theme/base/base.component';

const routes: Routes = [
  {
    path: 'admin',
    component: BaseComponent,
    loadChildren: () => import('./views/pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
