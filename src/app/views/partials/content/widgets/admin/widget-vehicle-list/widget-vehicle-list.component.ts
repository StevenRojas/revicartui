// Angular
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
// Lodash
import {shuffle} from 'lodash';
// Layout
import {LayoutConfigService} from '../../../../../../core/_base/layout';
import {Vehicle, VehicleList} from '../../../../../../core/admin';
import {Router} from '@angular/router';

@Component({
  selector: 'kt-widget-vehicle-list',
  templateUrl: './widget-vehicle-list.component.html',
  styleUrls: ['./widget-vehicle-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetVehicleListComponent implements OnInit {
  // Public properties
  @Input() vehicleSelected: string;
  @Input() data: VehicleList;
  @Output() vehicleSelectedEmit = new EventEmitter<number>();
  @ContentChild('actionTemplate', {static: true}) actionTemplate: TemplateRef<any>;

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    private router: Router
  ) {
    if (!this.data) {
      this.data = new VehicleList();
      this.data.default();
    }
  }
  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() { }

  selectVehicle(vehicleId: number) {
    // this.router.navigate(['/admin/workshop/vehicle/' + userId]);
    this.vehicleSelectedEmit.next(vehicleId)
  }
}
