import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '..';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionPhotoService {

  constructor(
    private http: HttpClient
  ) { }
  all(vehicleReceptionId: number): Observable<any> {
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders.set('token', '123');
    let params = new HttpParams()
    params = params.set('sort', '-id');
    return this.http.get(
      environment.api_url + 'reception/' + vehicleReceptionId + '/photo',
      { params: params}
    )
  }


  add(photoId: number, vehicleReceptionId: number, notes: string): Observable<any> {
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders.set('token', '123');
    let receptionPhotoObj = {
      'vehicle_reception': {
        'id': vehicleReceptionId
      },
      'notes': notes
    }
    if(photoId !== null) {
      receptionPhotoObj['photo'] = {
        'id': photoId
      }
    }
    return this.http.post(
      environment.api_url + 'reception/' + vehicleReceptionId + '/photo',
      receptionPhotoObj
    );
  }
}
