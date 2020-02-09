import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
// import {HttpErrorHandlerService, HandleError} from './http-error-handler.service';
import { environment } from 'src/environments/environment';


interface IBody {
  is_admin: number;
  role_id: number;
  access_token: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:8080',
    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private token: string;
  private userProfile: any;
  private isLogged = false;
  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private router: Router,
    // httpErrorHandler: HttpErrorHandlerService
  ) {
    const ivieToken = localStorage.getItem(environment.TOKEN_NAME);
    if (ivieToken != null) {
      this.isLogged = true;
      this.token = ivieToken;

      // this.userProfile = this.jwtHelper.decodeToken(ivieToken);
      // this.userProfile = this.jwtHelper.decodeToken(ivieToken);
      // this.verifyToken();
    }
    // this.handleError = httpErrorHandler.createHandleError('LoginService');
  }

  /**
   *
   * @param code String
   */
  login(code: string, origin: string): Observable<any> {
    return this.http.post(
      environment.api_url + 'login/auth',
      { 'code': code, 'origin': origin }, httpOptions
    ).pipe(
      // map(this.extractDataLogin),
      // catchError(this.handleError())
    );
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.isLogged = false;
    localStorage.removeItem(environment.TOKEN_NAME);
    this.router.navigate(['/login']);
  }

  verifyToken() {
    if (!this.getToken()) {
      this.logout();
    }
    // TODO consider other cases
    // if (this.isTokenExpired()) {
    //   this.logout();
    // }
  }

  isTokenExpired(): boolean {
    return false;
    // return this.jwtHelper.isTokenExpired(this.getToken());
  }

  getToken(): string {
    return localStorage.getItem(environment.TOKEN_NAME);
  }

  getLoginStatus(): boolean {
    // return true;
    if (localStorage.getItem(environment.TOKEN_NAME)) {
      return true;
    }
    return false;
  }


  jwtHeader() {
    // create authorization header with jwt token
    const currentToken = this.getToken();
    if (currentToken != null) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: currentToken
        })
      };
    }
    return null;
  }

  updateToken(newToken: string): void {
    this.token = newToken;
    localStorage.setItem(environment.TOKEN_NAME, newToken);
  }

  updateTokenFromHeader(header: HttpHeaders): void {
    if (header.has('token')) {
      if (header.get('token').length > 0) {
        this.updateToken(header.get('token'));
      } else {
        // TODO what happened if the token not arrive
        console.log('Ups! the token not arrive in header');
      }
    } else {
      console.log('There isn`t a token in header');
    }
  }

  private extractDataLogin = (res: any) => {
    const body: IBody = JSON.parse(res._body);
    const token = body && body.access_token;
    if (token) {
      // set token property
      this.token = token;
      this.isLogged = true;
      // jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem(environment.TOKEN_NAME, token);
      this.userProfile = this.jwtHelper.decodeToken(token).data;

    } else {
      // TODO write a friendly response
      console.log('Ups something is not working well');
    }

    return body || throwError({response: 'Unknow Error'});
  }
}

