import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtypeService {

  constructor(
    private http: HttpClient
  ) { }

  quickSearch(name: string): Observable<any[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'vehicle/enum/subtype', {
      params: params,
      headers: httpHeaders
    });
  }
}
