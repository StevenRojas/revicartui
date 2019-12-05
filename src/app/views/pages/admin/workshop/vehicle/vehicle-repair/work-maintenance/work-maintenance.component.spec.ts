import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMaintenanceComponent } from './work-maintenance.component';

describe('WorkMaintenanceComponent', () => {
  let component: WorkMaintenanceComponent;
  let fixture: ComponentFixture<WorkMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
