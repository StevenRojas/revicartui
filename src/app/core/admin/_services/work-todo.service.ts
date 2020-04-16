import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Company, Vehicle} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkTodoService {
  public updateRepairInfoMessage = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

    all(receptionId: number): Observable<any[]> {
      return this.http.get<any[]>( environment.api_url + 'reception/' + receptionId + '/worktodo');
    }

    post(receptionId: number, work: any): Observable<any> {
    work.vehicle_reception = {
      id: receptionId
    };
    work.work_category = {
      id: work.work_category.id.toString()
    };
    work.work_subcategory = {
      id: work.work_subcategory.id
    };
    return this.http.post<any>(environment.api_url + 'reception/' + receptionId + '/worktodo', work);
  }

  delete(receptionId: number, workTodoId: number): Observable<any> {
    return this.http.delete<any>(environment.api_url + 'reception/' + receptionId + '/worktodo/' + workTodoId);
  }
}
