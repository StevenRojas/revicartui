import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MaintenanceService, Vehicle} from '../../../../../../../core/admin';
import {main} from '@angular/compiler-cli/src/main';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'kt-work-maintenance',
  templateUrl: './work-maintenance.component.html',
  styleUrls: ['./work-maintenance.component.scss']
})
export class WorkMaintenanceComponent implements OnInit, OnChanges {
  @Input() vehicleReception: any;
  @Input() vehicle: Vehicle;
  @ViewChild('ownerNotes', {static: true}) ownerNotes: ElementRef;
  @ViewChild('vehicleNotes', {static: true}) vehicleNotes: ElementRef;
  public maintenance: any;
  constructor(
    private maintenanceService: MaintenanceService
  ) { }

  ngOnInit() {
    this.maintenance = {
      'owner_notes': '',
      'vehicle_notes': '',
      'maintenance_dates': []
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.vehicle && this.vehicleReception) {
      this.maintenanceService.get(this.vehicleReception.id).subscribe(
        (maintenance) => {
          this.maintenance = maintenance;
          this.bindElements();
        },
          error => this.maintenance = {}
      );
    }
  }
  public updateMaintenance(maintenance: any, key: number) {
    // this.maintenance['maintenance_dates'][key] = maintenance;
    let tempMaintenance = {};
    tempMaintenance['maintenance_dates'] = this.maintenance['maintenance_dates'];
    tempMaintenance['maintenance_dates'][key] = maintenance;
    this.maintenanceService.update(tempMaintenance, this.vehicleReception.id).subscribe(
      (maintenanceResponse) => {
        console.log(maintenanceResponse)
        // this.maintenance = maintenanceResponse;
      }
    );
  }

  private bindElements() {
    fromEvent(this.ownerNotes.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: any) => {
      this.maintenanceService.update({
        'owner_notes': text
      }, this.vehicleReception.id).subscribe(
        (response) => {
          console.log(response)
        }
      );
    });

    fromEvent(this.vehicleNotes.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: any) => {
      this.maintenanceService.update({
        'vehicle_notes': text
      }, this.vehicleReception.id).subscribe(
        (response) => {
          console.log(response)
        }
      );
    });
  }
}
