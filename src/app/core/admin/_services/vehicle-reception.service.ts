import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleReceptionService {

  constructor(
    private http: HttpClient
  ) { }

  getLastReception(vehicleId: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('sort', '-id');
    // TODO Filder for work_status, this is the new table
    return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/reception', { headers: httpHeaders});
  }


  get(receptionId: number, vehicleId: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/reception', { headers: httpHeaders});
  }

  quickSearch(name: string): Observable<any[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'brand', {
      params: params,
      headers: httpHeaders
    });
  }
}
