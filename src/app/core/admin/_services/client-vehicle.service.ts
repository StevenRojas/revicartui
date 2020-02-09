import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientList, ClientPagination, ClientVehicleList, Company} from '..';
import {ClientNoteList} from '../_models/client-note-list';
import {ClientNote} from '../_models/client-note';

@Injectable({
  providedIn: 'root'
})
export class ClientVehicleService {

  constructor(
    private http: HttpClient
  ) {
  }

  allById(clientId: number, pagination: ClientPagination, detail: boolean): Observable<ClientVehicleList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
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
    params = params.set('sort', pagination.sort);
    return this.http.get<ClientVehicleList>(environment.api_url + 'client/' + clientId + '/vehicle', {
      params: params,
      headers: httpHeaders
    });
  }


  findOwners(vehicleId: number): Observable<any[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    params = params.set('entity_detail', '1');
    params = params.set('vehicle_id', vehicleId.toString());
    return this.http.get<any[]>(environment.api_url + 'client-vehicle', {
      params: params,
      headers: httpHeaders
    });
  }

  quickSearch(licencePlate: string): Observable<any[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('q', licencePlate);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    params = params.set('entity_detail', '1');
    return this.http.get<any[]>(environment.api_url + 'client-vehicle', {
      params: params,
      headers: httpHeaders
    });
  }

  post(vehicleClient: any): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.post<any>(environment.api_url + 'client/' + vehicleClient.client.id + '/vehicle',
      vehicleClient, {headers: httpHeaders});
  }
}
