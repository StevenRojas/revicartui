import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTodoComponent } from './work-todo.component';

describe('WorkTodoComponent', () => {
  let component: WorkTodoComponent;
  let fixture: ComponentFixture<WorkTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
