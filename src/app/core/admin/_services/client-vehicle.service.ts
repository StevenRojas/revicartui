import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientList, ClientPagination, ClientVehicleList} from '..';
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

  allById(clientId: string, pagination: ClientPagination, detail: boolean): Observable<ClientVehicleList> {
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
    return this.http.get<ClientVehicleList>(environment.api_url + 'client/' + clientId + '/vehicle', {
      params: params,
      headers: httpHeaders
    });
  }
}
