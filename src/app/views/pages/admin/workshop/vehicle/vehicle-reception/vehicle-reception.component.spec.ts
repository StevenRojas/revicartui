import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReceptionComponent } from './vehicle-reception.component';

describe('VehicleReceptionComponent', () => {
  let component: VehicleReceptionComponent;
  let fixture: ComponentFixture<VehicleReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
