import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company, Vehicle} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkTodoService {

  constructor(
    private http: HttpClient
  ) { }

    post(receptionId: number, work: any): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    work.vehicle_reception = {
      id: receptionId
    }
    return this.http.post<any >(environment.api_url + 'reception/' + receptionId + '/worktodo', work, {headers: httpHeaders});
  }
}
