import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkSubCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  quickSearch(name: string, workCategoryId: number): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'work-category/' + workCategoryId + '/work-sub-category' , {
      params: params
    });
  }

  all(workCategoryId: string, vehicleId: any, vehicleSubTypeId: any): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('vehicle_id', vehicleId);
    params = params.set('vehicle_subtype_id', vehicleSubTypeId);
    return this.http.get<any[]>(environment.api_url + 'work-category/' + workCategoryId + '/work-sub-category', {
      params: params
    });
  }
  put(receptionId: any, id: string, body: {}): Observable<any> {
    return this.http.put<any>(environment.api_url + 'reception/' + receptionId + '/worktodo/' + id, body);
  }
}
