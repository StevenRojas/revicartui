import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientVehicleList, Company, PhotoService, Vehicle} from '../../../../../../core/admin';
import {CompanyVehicleService} from '../../../../../../core/admin/_services/company-vehicle.service';
import {CompanyVehicleList} from '../../../../../../core/admin/_models/company-vehicle-list';

@Component({
  selector: 'kt-company-vehicle',
  templateUrl: './company-vehicle.component.html',
  styleUrls: ['./company-vehicle.component.scss']
})
export class CompanyVehicleComponent implements OnInit, OnChanges {
  @Input() companySelected: Company;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'company_vehicle.id'};
  public vehicles = [];

  constructor(
    public companyVehicleService: CompanyVehicleService,
    private photoService: PhotoService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.companySelected.id && this.companySelected.id) {
      this.loadVehicles();
    }
  }

  loadVehicles() {
    this.companyVehicleService.allById(this.companySelected.id, this.pagination, true).subscribe(
      (vehicles: CompanyVehicleList) => {
        this.vehicles = vehicles.list;
      }
    );
  }

  refreshVehicles() {
    this.companyVehicleService.allById(this.companySelected.id, this.pagination, true).subscribe(
      (vehicles: CompanyVehicleList) => {
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
