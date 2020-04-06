import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HistoryService, Vehicle} from '../../../../../../core/admin';

@Component({
  selector: 'kt-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss']
})
export class VehicleHistoryComponent implements OnInit, OnChanges {
  @Input() vehicle: Vehicle;
  public historyList = [];
  public isCollapsedPhotos = {};
  public isCollapsedDocuments = {};
  public isCollapsedWorks = {};
  public receptionIdSelected: number;
  constructor(
    public historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.vehicle) {
      if(this.vehicle.id) {
        this.historyService.getHistory(this.vehicle.id).subscribe(
          (historyList) => {
            Object.keys(historyList).forEach(
              (value, key) => {
                this.isCollapsedPhotos[key] = true;
                this.isCollapsedDocuments[key] = true;
                this.isCollapsedWorks[key] = true;
              }
            );
            this.historyList = historyList;
          }
        );
      }
    }
  }

  public controlCollapse(id: string|number, type: string, receptionId: number) {
    this.receptionIdSelected = receptionId;
    Object.keys(this.isCollapsedDocuments).forEach((value, key) => {
      this.isCollapsedPhotos[key] = true;
      this.isCollapsedDocuments[key] = true;
      this.isCollapsedWorks[key] = true;
    });
    switch (type) {
      case 'doc':
        this.isCollapsedPhotos[id] = true;
        this.isCollapsedDocuments[id] = !this.isCollapsedDocuments[id];
        this.isCollapsedWorks[id] = true;
        break;
      case 'photo':
        this.isCollapsedPhotos[id] = !this.isCollapsedPhotos[id];
        this.isCollapsedDocuments[id] = true;
        this.isCollapsedWorks[id] = true;


        break;
      case 'work':
        this.isCollapsedPhotos[id] = true;
        this.isCollapsedDocuments[id] = true;
        this.isCollapsedWorks[id] = !this.isCollapsedWorks[id];
        break;
    }
  }
}
