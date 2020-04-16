import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {animate} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class VehicleReparationService {

  constructor(
    private http: HttpClient
  ) { }






  //
  // getAllVehicles(pagination: any): Observable<any[]> {
  //   let params = new HttpParams();
  //   params = params.set('status', 'r,s');
  //   params = params.set('sort', pagination['sort']);
  //   params = params.set('page', pagination['page']);
  //   params = params.set('entity_detail', '1');
  //   params = params.set('pagination', pagination['limit']);
  //   return this.http.get<any[]>(environment.api_url + 'vehicle-reception', { params: params });
  // }
  //
  // getLastReception(vehicleId: number): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.set('sort', '-id');
  //   params = params.set('entity_detail', '1');
  //   // TODO Filder for work_status, this is the new table
  //   return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/reception');
  // }
  //
  //
  // get(receptionId: number, vehicleId: number): Observable<any> {
  //   return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/reception');
  // }
  //
  // quickSearch(name: string): Observable<any[]> {
  //   let params = new HttpParams();
  //   params = params.set('q', name);
  //   params = params.set('page', '1');
  //   params = params.set('pagination', '0');
  //   return this.http.get<any[]>(environment.api_url + 'brand', {
  //     params: params
  //   });
  // }
  //
  // approve(receptionId: any): Observable<any> {
  //   return this.http.patch<any>(environment.api_url + 'reception/' + receptionId + '/start', {});
  // }
  //
  // start(vehicleId: any): Observable<any> {
  //   return this.http.post<any>(environment.api_url + 'vehicle/' + vehicleId + '/reception', {
  //     vehicle: {
  //       'id': vehicleId
  //     }
  //   })
  // }
  //
  // cancel(receptionId: any, notes: {}): Observable<any> {
  //   return this.http.patch<any>(environment.api_url + 'reception/' + receptionId + '/cancel', notes);
  // }
}
