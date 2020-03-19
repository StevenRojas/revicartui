import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTodoItemRepairComponent } from './work-todo-item-repair.component';

describe('WorkTodoItemRepairComponent', () => {
  let component: WorkTodoItemRepairComponent;
  let fixture: ComponentFixture<WorkTodoItemRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTodoItemRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTodoItemRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
