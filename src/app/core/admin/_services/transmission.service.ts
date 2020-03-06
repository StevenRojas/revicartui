import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  constructor(
    private http: HttpClient
  ) { }
  all() {
    let params = new HttpParams();
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'vehicle/enum/transmission', {
      params: params
    });
  }

  quickSearch(name: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'vehicle/enum/transmission', {
      params: params
    });
  }
}
