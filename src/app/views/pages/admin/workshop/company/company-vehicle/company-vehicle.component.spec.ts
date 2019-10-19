import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVehicleComponent } from './company-vehicle.component';

describe('CompanyVehicleComponent', () => {
  let component: CompanyVehicleComponent;
  let fixture: ComponentFixture<CompanyVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
