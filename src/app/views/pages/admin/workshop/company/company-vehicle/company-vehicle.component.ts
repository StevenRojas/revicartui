import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientVehicleList} from '../../../../../../core/admin';
import {CompanyVehicleService} from '../../../../../../core/admin/_services/company-vehicle.service';
import {CompanyVehicleList} from '../../../../../../core/admin/_models/company-vehicle-list';

@Component({
  selector: 'kt-company-vehicle',
  templateUrl: './company-vehicle.component.html',
  styleUrls: ['./company-vehicle.component.scss']
})
export class CompanyVehicleComponent implements OnInit, OnChanges {
  @Input() companyId: string;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'company_vehicle.id'};
  public vehicles = [];

  constructor(
    private companyVehicleService: CompanyVehicleService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.companyId) {
      this.loadVehicles();
    }
  }

  loadVehicles() {
    this.companyVehicleService.allById(this.companyId, this.pagination, true).subscribe(
      (vehicles: CompanyVehicleList) => {
        console.log(vehicles)
        this.vehicles = vehicles.list;
      }
    );
  }

}
