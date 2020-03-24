import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CompanyList} from '../_models/company-list';
import {CompanyPagination} from '../_models/company-pagination';
import {Company} from '../_models/company';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  constructor(
    private http: HttpClient
  ) { }
  public getAll(): Observable<any> {
    return this.http.get<any>(environment.api_url + 'reparation/enums/operator');
  }
  public update(operator: any, vehicleReceptionId: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('sort', '-id');
    return this.http.patch<any>(environment.api_url + 'reparation/operator/' + vehicleReceptionId, operator, { params: params});
  }
}
