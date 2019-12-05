import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-vehicle-history',
  templateUrl: './vehicle-history.component.html',
  styleUrls: ['./vehicle-history.component.scss']
})
export class VehicleHistoryComponent implements OnInit {
  public isCollapsedPhotos = {
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
    "10": true
  };
  public isCollapsedDocuments = {
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
    "10": true
  };
  public isCollapsedWorks = {
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
    "10": true
  };
  constructor() { }

  ngOnInit() {
  }

  public controlCollapse(id: string|number, type: string) {
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
