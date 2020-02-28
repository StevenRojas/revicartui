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
    let params = new HttpParams();
    params = params.set('sort', 'is_primary');
    return this.http.get<any>(environment.api_url + 'vehicle/' + vehicleId + '/photo',
      { params: params }
      );
  }


  post(vehicleId: any, file: any, isPrimary: boolean): Observable<any> {
    return this.http.post(
      environment.api_url + 'vehicle/' + vehicleId + '/photo',
      {
        'vehicle': {
          'id': vehicleId.toString()
        },
        'filename': file,
        'path_file': file,
        'is_primary': isPrimary
      }
    );
  }

  put(photo_id: number, vehicle: any, file: any, isPrimary: boolean): Observable<any> {
    return this.http.put(
      environment.api_url + 'vehicle/' + vehicle['id'] + '/photo/' + photo_id,
      {
        'vehicle': {
          'id': vehicle.id.toString()
        },
        'filename': file,
        'path_file': file,
        'is_primary': isPrimary
      }
    );
  }
}
