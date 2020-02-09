import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private http: HttpClient
  ) { }

  getPrimary(vehicleId): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    let params = new HttpParams();
    params = params.set('sort', 'is_primary');
    return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/photo',
      { headers: httpHeaders, params: params }
      );
  }


  post(vehicle: any, file: any, isPrimary: boolean): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.post(
      environment.api_url + 'vehicle/' + vehicle['id'] + '/photo',
      {
        'vehicle': {
          'id': vehicle.id.toString()
        },
        'filename': file,
        'path_file': file,
        'is_primary': isPrimary
      },
      { headers: httpHeaders }
    );
  }

  put(photo_id: number, vehicle: any, file: any, isPrimary: boolean): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('token', '123');
    return this.http.put(
      environment.api_url + 'vehicle/' + vehicle['id'] + '/photo/' + photo_id,
      {
        'vehicle': {
          'id': vehicle.id.toString()
        },
        'filename': file,
        'path_file': file,
        'is_primary': isPrimary
      },
      { headers: httpHeaders }
    );
  }
}
