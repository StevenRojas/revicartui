import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import {ClientVehicleService} from '../../../../../core/admin/_services/client-vehicle.service';
import {CompanyVehicleService} from '../../../../../core/admin/_services/company-vehicle.service';

@Component({
  selector: 'kt-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {
  public licensePlate = null;
  // public vehicles: Observable<any[]>;
  public resultCompanyVehicle: any[];
  public resultClientVehicle: any[];
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.license_plate'};
  public loading: boolean;
  public notFoundCompanyVehicle: boolean;
  public notFoundClientVehicle: boolean;
  public messageClientVehicles: string;
  public messageCompanyVehicles: string;
  constructor(
    private clientVehicle: ClientVehicleService,
    private companyVehicle: CompanyVehicleService
  ) { 
    this.notFoundClientVehicle = true;
    this.notFoundCompanyVehicle = true;
    this.resultCompanyVehicle = [];
    this.resultClientVehicle = [];
  }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 1),
      debounceTime(200),
      // distinctUntilChanged()
    ).subscribe((text) => {
      this.notFoundClientVehicle = true;
      this.notFoundCompanyVehicle = true;
      this.messageClientVehicles = null;
      this.messageCompanyVehicles = null;
      this.pagination.query = text;
      this.loading = true;
      this.clientVehicle.quickSearch(text).subscribe(
        (result) => {
          this.resultClientVehicle = result;
          if(this.resultClientVehicle.length === 0) {
            this.messageClientVehicles = "No se encontraron resultados relacionados";
            this.notFoundClientVehicle = false;
          }
        }
      );
      this.companyVehicle.quickSearch(text).subscribe(
        (result) => {
          
          this.resultCompanyVehicle = result;
          if(this.resultCompanyVehicle.length === 0) {
            this.messageCompanyVehicles = "No se encontraron resultados relacionados";
            this.notFoundCompanyVehicle = false;
          }
        }
      )
    });
  }

}
