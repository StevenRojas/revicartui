import { Component, OnInit } from '@angular/core';
import {Vehicle, VehicleList, VehicleService} from '../../../../../../core/admin';

@Component({
  selector: 'kt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  public list: VehicleList;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.id'};
  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
   this.vehicleService.all(this.pagination, true).subscribe(
     (vehicles: VehicleList) => {
       for (let count = 0; count < vehicles.list.length; count++) {
         // vehicles.list[count].clients =  [];
         vehicles.list[count].client = {
           id: 1,
           name: 'Nelson Escudero'
         };
         vehicles.list[count].work_todo = [];
         vehicles.list[count].work_status = {};
         vehicles.list[count].work_status.status = 'En proceso';
       }
       this.list = vehicles;
     }
   );
  }

}
