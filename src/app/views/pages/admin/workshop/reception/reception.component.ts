import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
import {ClientVehicleService} from '../../../../../core/admin/_services/client-vehicle.service';
import {CompanyVehicleService} from '../../../../../core/admin/_services/company-vehicle.service';
import {Router} from '@angular/router';
import {VehicleService} from '../../../../../core/admin';

@Component({
  selector: 'kt-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {
  public licensePlate = null;
  // public vehicles: Observable<any[]>;
  public resultVehicle: any[];
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  public pagination = {
    page: 1,
    query: undefined,
    queryId: undefined,
    limit: 20,
    sort: 'vehicle.license_plate'
  };
  public loading: boolean;
  public notFoundVehicle: boolean;
  public messageVehicles: string;
  constructor(
    private clientVehicle: ClientVehicleService,
    private companyVehicle: CompanyVehicleService,
    private vehicleService: VehicleService,
    private router: Router
  ) {
    this.notFoundVehicle = true;
    this.resultVehicle = [];
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
      this.notFoundVehicle = true;
      this.messageVehicles = null;
      this.pagination.query = text;
      this.loading = true;
      this.pagination.query = text;
      this.vehicleService.all(this.pagination, true).subscribe(
        (vehicles) => {
          if(vehicles.list.length === 0) {
            this.messageVehicles = "No se encontraron resultados relacionados";
            this.notFoundVehicle = false;
            return;
          }
          this.resultVehicle = vehicles.list;
        }
      )
    });

  }

  clearSearch() {
    this.licensePlate = "";
    this.notFoundVehicle = true;
    this.messageVehicles = null;
    this.resultVehicle = [];
  }

  showVehicle(vehicle) {
    console.log(vehicle)
    this.router.navigate(['admin/workshop/vehicle/' + vehicle.id], { queryParams:  {'q_id': vehicle.id}});
  }
}
