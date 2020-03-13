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
      params: params
    });
  }
  allByOwner(pagination: VehiclePagination, detail: boolean, owner: string): Observable<VehicleList> {
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
      params: params
    });
  }
  get(vehicleId: number): Observable<Vehicle> {
    let params = new HttpParams()
    params = params.set('entity_detail', '1');
    return this.http.get<Vehicle>(environment.api_url + 'vehicle/' + vehicleId, {
      params: params
    });
  }


  post(vehicle: any): Observable<Vehicle> {
    if(vehicle.year) {
      vehicle.year = parseInt(vehicle.year, 10);
    }
    if(vehicle.mileage) {
      vehicle.mileage = parseInt(vehicle.mileage, 10);
    }
    // vehicle.has_alert = vehicle.has_alert ? 1 : 0;
    return this.http.post<Vehicle>(environment.api_url + 'vehicle', vehicle);
  }

  put(vehicle: Vehicle): Observable<Vehicle> {
    if (vehicle.year) {
      vehicle.year = parseInt(vehicle.year, 10);
    }
    return this.http.put<Vehicle>(environment.api_url + 'vehicle/' + vehicle.id, vehicle);
  }

  delete(vehicleId: any) {
    return this.http.delete(environment.api_url + 'vehicle/' + vehicleId);
  }

  accesories(): Observable<any> {
    return this.http.get<any>(environment.api_url + 'vehicle/enum/accessory');
  }
}
