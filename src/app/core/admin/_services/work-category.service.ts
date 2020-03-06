import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  quickSearch(name: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<any[]>(environment.api_url + 'work-category', {
      params: params
    });
  }

  all(): Observable<any[]> {
   return this.http.get<any[]>(environment.api_url + 'work-category')
  }
}
