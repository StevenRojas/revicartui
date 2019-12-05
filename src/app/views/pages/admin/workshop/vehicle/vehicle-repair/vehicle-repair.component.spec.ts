import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRepairComponent } from './vehicle-repair.component';

describe('VehicleDetailComponent', () => {
  let component: VehicleRepairComponent;
  let fixture: ComponentFixture<VehicleRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
