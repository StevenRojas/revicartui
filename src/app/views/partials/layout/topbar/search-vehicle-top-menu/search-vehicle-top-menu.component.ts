// Angular
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import { fromEvent } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Vehicle, VehicleService} from '../../../../../core/admin';

@Component({
  selector: 'kt-search-vehicle-top-menu',
  templateUrl: './search-vehicle-top-menu.component.html',
})
export class SearchVehicleTopMenuComponent implements OnInit, OnChanges {
  @Input() icon: string = 'flaticon2-search-1';
  @Input() useSVG: boolean;
  @Input() searchString: string;
  @Input() owner: string;
  @Output() emitVehicleSelected = new EventEmitter<Vehicle>();
  @Output() emitVehicleClear = new EventEmitter<boolean>();

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  public data: any[];
  public result: any[];
  public loading: boolean;
  public pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.license_plate'};

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  constructor(
    private cdr: ChangeDetectorRef,
    private vehicleService: VehicleService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this.result = [];
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 1),
      debounceTime(400),
      // distinctUntilChanged()
    ).subscribe((text) => {
      this.pagination.query = text;
      this.loading = true;
      this.vehicleService.allByOwner(this.pagination, true, this.owner).subscribe(
        (response) => {
          this.data = response.list;
          this.loading = false;
          this.searchInput.nativeElement.focus();
        }
      );
    });
  }

  ngOnChanges(changes) {
    if (this.owner) { }
  }
  /**
   * @param $event
   */
  vehicleSelected(vehicle: Vehicle) {
    this.searchInput.nativeElement.value = vehicle.license_plate;
    this.emitVehicleSelected.next(vehicle);
  }

  /**
   * Clear search
   *
   * @param e: Event
   */
  clear(e) {
    this.data = null;
    this.pagination = { page: 1, query: undefined, queryId: undefined, limit: 10, sort: 'vehicle.license_plate'};
    this.searchInput.nativeElement.value = '';
    this.emitVehicleClear.next(true);
  }
}
