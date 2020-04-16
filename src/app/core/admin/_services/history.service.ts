import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient
  ) { }

  public getHistory(vehicleId: number): Observable<any> {
    return this.http.get<any>(environment.api_url + 'history/reception/' + vehicleId);
  }

  public getPhotos(receptionId: number): Observable<any> {
    return this.http.get<any>(environment.api_url + 'history/photos/' + receptionId);
  }

  public getDocuments(receptionId: number): Observable<any> {
    return this.http.get<any>(environment.api_url + 'history/document/' + receptionId);
  }

  public getWork(receptionId: number): Observable<any> {
    return this.http.get(environment.api_url + 'history/work/' + receptionId);
  }
}
