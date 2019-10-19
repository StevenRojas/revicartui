// Angular
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vehicle} from '../../../../core/admin';


@Component({
  selector: 'kt-search-vehicle-result',
  templateUrl: './search-vehicle-result.component.html',
  styleUrls: ['./search-vehicle-result.component.scss']
})
export class SearchVehicleResultComponent {
  // Public properties
  @Input() data: Vehicle[];
  @Input() noRecordText: string;
  @Output() emitVehicleSelected = new EventEmitter<Vehicle>();

  public constructor() {}

  vehicleSelected(vehicle: Vehicle) {
    this.emitVehicleSelected.next(vehicle);
  }
}
