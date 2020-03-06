import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseTypeService {

  constructor(
    private http: HttpClient
  ) { }

  all(): Observable<Company[]> {
    let params = new HttpParams();
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<Company[]>(environment.api_url + 'vehicle/enum/usetype', {
      params: params
    });
  }

  quickSearch(name: string): Observable<Company[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<Company[]>(environment.api_url + 'vehicle/enum/usetype', {
      params: params,
      headers: httpHeaders
    });
  }
}
