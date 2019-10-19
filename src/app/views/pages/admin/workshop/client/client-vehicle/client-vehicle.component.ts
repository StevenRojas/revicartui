import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientService, ClientVehicleList} from '../../../../../../core/admin';
import {ClientVehicleService} from '../../../../../../core/admin/_services/client-vehicle.service';

@Component({
  selector: 'kt-client-vehicle',
  templateUrl: './client-vehicle.component.html',
  styleUrls: ['./client-vehicle.component.scss']
})
export class ClientVehicleComponent implements OnInit, OnChanges {
  @Input() clientId: string;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'client_vehicle.id'};
  public vehicles = [];
  constructor(
    public clientVehicleService: ClientVehicleService
  ) { }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clientId) {
      this.loadVehicles();
    }
  }

  loadVehicles() {
    this.clientVehicleService.allById(this.clientId, this.pagination, true).subscribe(
      (vehicles: ClientVehicleList) => {
        this.vehicles = vehicles.list;
      }
    );
  }
}
