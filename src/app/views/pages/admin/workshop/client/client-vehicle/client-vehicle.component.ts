import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client, ClientService, ClientVehicleList, PhotoService, Vehicle} from '../../../../../../core/admin';
import {ClientVehicleService} from '../../../../../../core/admin/_services/client-vehicle.service';

@Component({
  selector: 'kt-client-vehicle',
  templateUrl: './client-vehicle.component.html',
  styleUrls: ['./client-vehicle.component.scss']
})
export class ClientVehicleComponent implements OnInit, OnChanges {
  @Input() clientSelected: Client;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: '-id'};
  public vehicles = [];
  constructor(
    public clientVehicleService: ClientVehicleService,
    private photoService: PhotoService
  ) { }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clientSelected && this.clientSelected.id) {
      this.loadVehicles();
    }
  }

  loadVehicles() {
    this.clientVehicleService.allById(this.clientSelected.id, this.pagination, true).subscribe(
      (vehicles: ClientVehicleList) => {
        this.vehicles = vehicles.list;
      }
    );
  }

  refreshVehicles() {
    this.clientVehicleService.allById(this.clientSelected.id, this.pagination, true).subscribe(
      (vehicles: ClientVehicleList) => {
        this.vehicles = vehicles.list;
      }
    );
  }

  addVehicle(vehicle) {
    this.vehicles.unshift([new Vehicle(vehicle)]);
  }

  getPrimaryPhoto() {
    // this.photoService.getPrimary()
  }
}
