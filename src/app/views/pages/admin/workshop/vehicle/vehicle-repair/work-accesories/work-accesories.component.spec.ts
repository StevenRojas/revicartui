import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAccesoriesComponent } from './work-accesories.component';

describe('WorkAccesoriesComponent', () => {
  let component: WorkAccesoriesComponent;
  let fixture: ComponentFixture<WorkAccesoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAccesoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAccesoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
