// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
import {LoginService} from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private loginService: LoginService,
      private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
      let canEnter = false;
      const redirectTo = '/auth/login';
      const url = state.url;
        if (this.loginService.getToken() != null)  {
          canEnter = true;
        } else {
          this.router.navigate([redirectTo]);
        }
        return canEnter;
    }
}
