import { Component, OnInit } from '@angular/core';
import {Vehicle, VehicleList, VehicleReceptionService, VehicleService} from '../../../../../../core/admin';

@Component({
  selector: 'kt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  public list: VehicleList;
  public ownerSelected = 'client';
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'updated_at'};
  constructor(
    private vehicleService: VehicleService,
    private vehicleReceptionService: VehicleReceptionService
  ) { }

  ngOnInit() {
   this.loadList();
  }

  loadList() {
    this.vehicleReceptionService.getAllVehicles().subscribe(
      (vehicles) => {
        console.log(vehicles);
      }
    );
    this.list = new VehicleList();
    this.list.clear();
    this.vehicleService.allByOwner(this.pagination, true, this.ownerSelected).subscribe(
      (vehicles: VehicleList) => {
        for (let count = 0; count < vehicles.list.length; count++) {
          vehicles.list[count].work_todo = [];
          vehicles.list[count].work_status = {};
          vehicles.list[count].work_status.status = 'En proceso';
        }
        this.list = vehicles;
      }
    );
  }

}
