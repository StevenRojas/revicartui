import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTodoRepairComponent } from './work.component';

describe('WorkComponent', () => {
  let component: WorkTodoRepairComponent;
  let fixture: ComponentFixture<WorkTodoRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTodoRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTodoRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
