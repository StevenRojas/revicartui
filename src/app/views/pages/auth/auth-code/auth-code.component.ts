import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { AuthService, User, AuthNoticeService } from 'src/app/core/auth';
import { LocalStoreService } from 'src/app/core/_base/crud';
import { LoginService } from 'src/app/core/auth/_services';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-auth-code',
  templateUrl: './auth-code.component.html',
  styleUrls: ['./auth-code.component.scss']
})
export class AuthCodeComponent implements OnInit {
  public errorMsg: string;
  public user: User;
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private localStoreService: LocalStoreService,
    private router: Router,
    private authService: AuthService,
    private authNoticeService: AuthNoticeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        if (queryParams.code) {
          console.log(queryParams.code);
          this.loginService.login(queryParams.code, 'google').subscribe(
            (result) => {
              if (result.token) {
                this.localStoreService.setItem(environment.TOKEN_NAME, result.token);
                this.localStoreService.setItem('user_name', result.user_name);
                this.localStoreService.setItem('user_email', result.user_email);
                this.localStoreService.setItem('user_id', result.user_id);
                this.authService.setUser(result.token);
                // this.user.token = result.token;
                this.router.navigate(['admin/workshop/reception']);
              }
              // this.errorMsg = 'Invalid Credentials';
              // setTimeout(() => {
              //     this.router.navigate(['/login']);
              //   }, 4000);
            },
            error => {
              this.errorMsg = 'Credenciales Inv&aacute;lidas';
              this.authNoticeService.setNotice(this.errorMsg, 'info');
              setTimeout(() => {
                this.router.navigate(['/auth/login']);
              }, 4000);

            }
          );
        }
      });
    });
  }

}
