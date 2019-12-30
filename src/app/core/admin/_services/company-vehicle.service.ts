import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyPagination} from '..';
import {CompanyVehicleList} from '../_models/company-vehicle-list';

@Injectable({
  providedIn: 'root'
})
export class CompanyVehicleService {

  constructor(
    private http: HttpClient
  ) { }

  allById(companyId: string, pagination: CompanyPagination, detail: boolean): Observable<CompanyVehicleList> {
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
    return this.http.get<CompanyVehicleList>(environment.api_url + 'company/' + companyId + '/vehicle', {
      params: params,
      headers: httpHeaders
    });
  }

  post(vehicleClient: any):Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.post<any>(environment.api_url + 'company/' + vehicleClient.company.id + '/vehicle',
      vehicleClient, {headers: httpHeaders});
  }
}
