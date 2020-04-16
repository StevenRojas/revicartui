import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyList} from '../_models/company-list';
import {CompanyPagination} from '../_models/company-pagination';
import {Company} from '../_models/company';

@Injectable({
  providedIn: 'root'
})
export class WorkstatusService {
  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.api_url + 'reparation/enums/status');
  }

  public update(status: any, vehicleReceptionId: any): Observable<any> {
    return this.http.patch<any>(environment.api_url + 'reparation/status/' + vehicleReceptionId, status);
  }
}
