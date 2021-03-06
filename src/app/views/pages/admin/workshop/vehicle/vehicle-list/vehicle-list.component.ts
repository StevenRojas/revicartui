import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Vehicle, VehicleList, VehicleReceptionService, VehicleService} from '../../../../../../core/admin';
import {fromEvent} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  selector: 'kt-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  public list: any[];
  public tempList: any[];
  public ownerSelected = 'client';
  public stringSearh = null;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'updated_at'};
  constructor(
    private vehicleService: VehicleService,
    private vehicleReceptionService: VehicleReceptionService
  ) { }

  ngOnInit() {
    this.loadList();
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      // filter(res => res.length > 1),
      debounceTime(100),
      // distinctUntilChanged()
    ).subscribe((text) => {
      const list  = this.tempList.filter(
        item => item.vehicle.license_plate.indexOf(text) != -1
      )
      this.list = list;
    });
  }

  loadList() {
    this.vehicleReceptionService.getAllVehicles(this.pagination).subscribe(
      (vehicles) => {
        this.list = vehicles;
        this.tempList = vehicles;
      }
    );
  }

  clearSearch() {
    console.log(this.tempList)
    this.stringSearh = '';
    this.list = this.tempList;
  }

  setOrder(sort: string) {
    this.stringSearh = '';
    this.pagination.sort = sort;
    this.loadList();
  }

}
