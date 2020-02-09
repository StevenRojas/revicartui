import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './views/pages/test/test.component';
import {BaseComponent} from './views/theme/base/base.component';
import { AuthGuard } from './core/auth';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('src/app/views/pages/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'auth',
    loadChildren: () => import('src/app/views/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./views/pages/admin/admin.module').then(m => m.AdminModule)
      }
    ]
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
