import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientList} from '..';
import {ClientNoteList} from '../_models/client-note-list';
import {ClientNote} from '../_models/client-note';

@Injectable({
  providedIn: 'root'
})
export class ClientNoteService {

  constructor(
    private http: HttpClient
  ) {
  }

  allById(clientId: string | number, page: string, limit: string, sortField: string): Observable<ClientNoteList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('limit', limit);
    params = params.set('sort', sortField);
    params = params.set('entity_detail', '1');
    return this.http.get<ClientNoteList>(environment.api_url + 'client/' + clientId + '/note', {
      params: params,
      headers: httpHeaders
    });
  }

  addComment(clientId, userId, comment): Observable<ClientNote> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.post<ClientNote>(environment.api_url + 'client/' + clientId + '/note', {
      comment: comment,
      client: {id: clientId},
      user: {id: userId}
    }, {headers: httpHeaders});
  }
}
