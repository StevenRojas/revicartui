import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientList} from '..';
import {ClientNoteList} from '../_models/client-note-list';
import {ClientNote} from '../_models/client-note';
import {CompanyNoteList} from '../_models/company-note-list';
import {CompanyNote} from '../_models/company-note';

@Injectable({
  providedIn: 'root'
})
export class CompanyNoteService {

  constructor(
    private http: HttpClient
  ) {
  }

  allById(companyId: string | number, page: string, limit: string, sortField: string): Observable<CompanyNoteList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('limit', limit);
    params = params.set('sort_field', sortField);
    params = params.set('entity_detail', '1');
    return this.http.get<CompanyNoteList>(environment.api_url + 'company/' + companyId + '/note', {
      params: params,
      headers: httpHeaders
    });
  }

  addComment(companyId, userId, comment): Observable<CompanyNote> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.post<CompanyNote>(environment.api_url + 'company/' + companyId + '/note', {
      comment: comment,
      company: {id: companyId},
      user: {id: userId}
    }, {headers: httpHeaders});
  }
}
