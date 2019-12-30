import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyList} from '../_models/company-list';
import {CompanyPagination} from '../_models/company-pagination';
import {Company} from '../_models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient
  ) { }
  all(pagination: CompanyPagination, detail: boolean): Observable<CompanyList> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams()
    params = params.set('page', pagination.page.toString());
    if (pagination.queryId) {
      params = params.set('q_id', pagination.queryId);
    }
    if (pagination.query) {
      params = params.set('q', pagination.query);
    }
    if(detail) {
      params = params.set('entity_detail', '1');
    }
    return this.http.get<CompanyList>(environment.api_url + 'company', {
      params: params,
      headers: httpHeaders
    });
  }

  quickSearch(name: string): Observable<Company[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('page', '1');
    params = params.set('pagination', '0');
    return this.http.get<Company[]>(environment.api_url + 'company', {
      params: params,
      headers: httpHeaders
    });
  }

  get(companyId: string): Observable<Company> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.get<Company>(environment.api_url + 'company/' + companyId);
  }

  post(company: any): Observable<Company> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    company.has_alert = company.has_alert ? true : false;
    if (company.parent) {
      company.parent = {id: company.parent.id};
    }
    return this.http.post<Company>(environment.api_url + 'company', company, {headers: httpHeaders});
  }

  put(company: Company): Observable<Company> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('entity_detail', '1');
    // Pass to integer
    company.has_alert = company.has_alert ? true : false;
    if (company.parent) {
      company.parent = {id: company.parent.id};
    }
    return this.http.put<Company>(environment.api_url + 'company/' + company.id, company, {
      params: params,
      headers: httpHeaders
    });
  }

  delete(companyId: any) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.delete(environment.api_url + 'company/' + companyId, {headers: httpHeaders});
  }
}
