import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMaintenanceItemComponent } from './work-maintenance-item.component';

describe('WorkMaintenanceItemComponent', () => {
  let component: WorkMaintenanceItemComponent;
  let fixture: ComponentFixture<WorkMaintenanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMaintenanceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMaintenanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
