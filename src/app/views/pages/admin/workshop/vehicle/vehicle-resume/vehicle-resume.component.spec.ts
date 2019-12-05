import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleResumeComponent } from './vehicle-resume.component';

describe('VehicleResumeComponent', () => {
  let component: VehicleResumeComponent;
  let fixture: ComponentFixture<VehicleResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
