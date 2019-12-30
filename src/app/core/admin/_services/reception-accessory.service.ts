import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionAccessoryService {

  constructor(
    private http: HttpClient
  ) { }

  all(vehicleReceptionId: number): Observable<any[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<any[]>(environment.api_url + 'reception/' + vehicleReceptionId + '/accessory',
      {headers: httpHeaders});
  }

  add(vehicleReceptionId: number, vehicleAccessoryId: number, quantity: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    const body = {
      vehicle_accesory: {
        id: vehicleAccessoryId
      },
      vehicle_reception: {
        id: vehicleReceptionId
      },
      quantity
    };
    return this.http.post<any>(environment.api_url + 'reception/' + vehicleReceptionId + '/accessory',
      body,{headers: httpHeaders});
  }

  update(id: number, vehicleReceptionId: number, quantity) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    const body = {
      id,
      quantity: parseInt(quantity, 10)
    };
    return this.http.put<any>(environment.api_url + 'reception/' + vehicleReceptionId + '/accessory/' + id,
      body,{headers: httpHeaders});
  }

  remove(id: number, vehicleReceptionId: number): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.delete<any>(environment.api_url + 'reception/' + vehicleReceptionId + '/accessory/' + id,
      {headers: httpHeaders});
  }

}
