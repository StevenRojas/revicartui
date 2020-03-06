import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTodoItemComponent } from './work-todo-item.component';

describe('WorkTodoItemComponent', () => {
  let component: WorkTodoItemComponent;
  let fixture: ComponentFixture<WorkTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
