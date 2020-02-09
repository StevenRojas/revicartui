import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle, VehicleList, VehiclePagination} from '..';
import {subscribeToPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(
    private http: HttpClient
  ) { }


  all(pagination: VehiclePagination, detail: boolean): Observable<VehicleList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams()
    params = params.set('page', pagination.page.toString());
    if (pagination.queryId) {
      params = params.set('q_id', pagination.queryId);
    }
    if (pagination.query) {
      params = params.set('q', pagination.query);
    }
    if (detail) {
      params = params.set('entity_detail', '1');
    }
    return this.http.get<VehicleList>(environment.api_url + 'vehicle', {
      params: params,
      headers: httpHeaders
    });
  }
  allByOwner(pagination: VehiclePagination, detail: boolean, owner: string): Observable<VehicleList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams()
    params = params.set('page', pagination.page.toString());
    if (pagination.queryId) {
      params = params.set('q_id', pagination.queryId);
    }
    if (pagination.query) {
      params = params.set('q', pagination.query);
    }
    if (detail) {
      params = params.set('entity_detail', '1');
    }

    let url = environment.api_url + 'client-vehicle';
    if (owner === 'company') {
      url = environment.api_url + 'company-vehicle'
    }
    return this.http.get<VehicleList>(url, {
      params: params,
      headers: httpHeaders
    });
  }
  get(vehicleId: number): Observable<Vehicle> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<Vehicle>(environment.api_url + 'vehicle/' + vehicleId, {headers: httpHeaders});
  }


  post(vehicle: any): Observable<Vehicle> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    if(vehicle.year) {
      vehicle.year = parseInt(vehicle.year, 10);
    }
    if(vehicle.mileage) {
      vehicle.mileage = parseInt(vehicle.mileage, 10);
    }
    // vehicle.has_alert = vehicle.has_alert ? 1 : 0;
    return this.http.post<Vehicle>(environment.api_url + 'vehicle', vehicle, {headers: httpHeaders});
  }

  put(vehicle: Vehicle): Observable<Vehicle> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    if (vehicle.year) {
      vehicle.year = parseInt(vehicle.year, 10);
    }
    return this.http.put<Vehicle>(environment.api_url + 'vehicle/' + vehicle.id, vehicle, {headers: httpHeaders});
  }

  delete(vehicleId: any) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    // return this.http.delete(environment.api_url + 'vehicle/' + vehicleId, {headers: httpHeaders})
    //   .toPromise()
    //   .then( res => true)
    //   .catch( err => false)
    return this.http.delete(environment.api_url + 'vehicle/' + vehicleId, {headers: httpHeaders});
  }

  accesories(): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<any>(environment.api_url + 'vehicle/enum/accessory', {
      headers: httpHeaders
    });
  }
}
