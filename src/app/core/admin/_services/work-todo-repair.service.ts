import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {animate} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class WorkTodoRepairService {
  public updateReceptionInfoMessage = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  all(reparationId: number): Observable<any[]> {
    return this.http.get<any[]>( environment.api_url + 'reparation/' + reparationId + '/worktodo');
  }

  post(reparationId: number, work: any): Observable<any> {
    work.vehicle_reception = {
      id: reparationId
    };
    work.work_category = {
      id: work.work_category.id.toString()
    };
    work.work_subcategory = {
      id: work.work_subcategory.id
    };
    return this.http.post<any>(environment.api_url + 'reparation/' + reparationId + '/worktodo', work);
  }

  update(reparationId: number, work: any): Observable<any> {
    return this.http.put<any>(environment.api_url + 'reparation/' + reparationId + '/worktodo', work);
  }

  delete(reparationId: number, workTodoId: number): Observable<any> {
    return this.http.delete<any>(environment.api_url + 'reparation/' + reparationId + '/worktodo/' + workTodoId);
  }

  put(receptionId: any, id: string, body: {}): Observable<any> {
    return this.http.put<any>(environment.api_url + 'reparation/' + receptionId + '/worktodo/' + id, body);
  }
}
