import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  constructor(
    private http: HttpClient
  ) { }
  public getAll(): Observable<any> {
    return this.http.get<any>(environment.api_url + 'reparation/maintenance');
  }
  public get(vehicleReceptionId: number): Observable<any> {
    return this.http.get<any>(environment.api_url + 'reparation/maintenance/' + vehicleReceptionId);
  }
  public update(maintenance: any, vehicleReceptionId: any): Observable<any> {
    return this.http.patch<any>(environment.api_url + 'reparation/maintenance/' + vehicleReceptionId, maintenance);
  }
}
