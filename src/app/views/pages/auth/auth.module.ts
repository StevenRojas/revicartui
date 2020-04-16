// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// CRUD
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthCodeComponent } from './auth-code/auth-code.component';
// import { RegisterComponent } from './register/register.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthGuard, AuthService } from '../../../core/auth';
import {JwtInterceptorService} from '../../../core/_base/crud';
import {PartialsModule} from '../../partials/partials.module';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			},
			{
				path: 'auth-code',
				component: AuthCodeComponent
			}
			// {
			// 	path: 'register',
			// 	component: RegisterComponent
			// },
			// {
			// 	path: 'forgot-password',
			// 	component: ForgotPasswordComponent,
			// }
		]
	}
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TranslateModule.forChild(),
    PartialsModule,
    // StoreModule.forFeature('auth', authReducer),
    // EffectsModule.forFeature([AuthEffects])
  ],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		AuthCodeComponent,
		// RegisterComponent,
		// ForgotPasswordComponent,
		AuthNoticeComponent
	],
  providers:[
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptorService,
    //   multi: true
    // }
  ]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}
