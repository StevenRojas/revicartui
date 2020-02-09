import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Vehicle, VehicleReceptionService} from '../../../../../../core/admin';

@Component({
  selector: 'kt-vehicle-reception',
  templateUrl: './vehicle-reception.component.html',
  styleUrls: ['./vehicle-reception.component.scss']
})
export class VehicleReceptionComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle;
  @Input() vehicleReception: any;
  public reception: any;
  // public vehicleReception: any;
  constructor(
    private vehicleReceptionServices: VehicleReceptionService
  ) { }

  ngOnInit() {}

  ngOnChanges(changes) {
    if (this.vehicle.id) {
      this.loadVehicleReception();
    }
  }

  public loadVehicleReception() {
    this.vehicleReceptionServices.getLastReception(this.vehicle.id).subscribe(
      (vehicleReceptionObj) => {
        if (vehicleReceptionObj && Object.keys(vehicleReceptionObj).length > 0) {
          this.vehicleReception = vehicleReceptionObj[0];
        }
      }
    );
  }
}
