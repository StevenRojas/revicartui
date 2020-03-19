import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Vehicle} from '../../../../../../../../core/admin';
import {MatDatepickerInputEvent} from '@angular/material';

@Component({
  selector: 'kt-work-maintenance-item',
  templateUrl: './work-maintenance-item.component.html',
  styleUrls: ['./work-maintenance-item.component.scss']
})
export class WorkMaintenanceItemComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  @Input() maintenance: any;
  @Output() maintenanceUpdateEmit = new EventEmitter<any>();
  @ViewChild('km', {static: true}) km: ElementRef;
  public itemWhen: any;
  public itemKm: any;
  constructor() { }

  ngOnInit() {
    fromEvent(this.km.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: any) => {
      this.itemKm = text;
      this.updateMaintenance({
        'concept': this.maintenance.concept,
        'km': this.itemKm,
        'when': this.itemWhen
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.vehicleReception) {
      this.itemWhen = moment(this.maintenance.when).format();
      this.itemKm = this.maintenance.km;
    }
  }

  public updateDate(dateChange: MatDatepickerInputEvent<Date>) {
    this.updateMaintenance({
      'concept': this.maintenance.concept,
      'km': this.itemKm,
      'when': moment(dateChange.value).format("YYYY-MM-DD")
    });
    return dateChange
  }

  public updateMaintenance(maintenance: any) {
    this.maintenanceUpdateEmit.emit(maintenance);
  }
}
