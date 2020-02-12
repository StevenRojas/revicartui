import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, ClientList, ClientPagination} from '..';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(
    private http: HttpClient
  ) { }
  all(pagination: ClientPagination): Observable<ClientList> {
    let params = new HttpParams()
    params = params.set('page', pagination.page.toString());
    if(pagination.queryId) {
      params = params.set('q_id', pagination.queryId);
    }
    if(pagination.query) {
      params = params.set('q', pagination.query);
    }
    return this.http.get<ClientList>(environment.api_url + 'client', {
      params: params,
      headers: new HttpHeaders({})
    });
  }

  get(clientId: string): Observable<Client> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<Client>(environment.api_url + 'client/' + clientId, { headers: new HttpHeaders({}) });
  }

  post(client: any): Observable<Client> {
    console.log(client)
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    client.has_alert = client.has_alert ? true : false;
    return this.http.post<Client>(environment.api_url + 'client', client, {headers: httpHeaders});
  }

  put(client: Client): Observable<Client> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    // Pass to integer
    client.has_alert = client.has_alert ? true : false;
    return this.http.put<Client>(environment.api_url + 'client/' + client.id, client, {headers: httpHeaders});
  }

  delete(clientId: any) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    // return this.http.delete(environment.api_url + 'client/' + clientId, {headers: httpHeaders})
    //   .toPromise()
    //   .then( res => true)
    //   .catch( err => false)
    return this.http.delete(environment.api_url + 'client/' + clientId, {headers: httpHeaders});
  }
}
