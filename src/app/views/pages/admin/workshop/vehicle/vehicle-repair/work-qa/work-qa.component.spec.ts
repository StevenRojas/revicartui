import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkQaComponent } from './work-qa.component';

describe('WorkQaComponent', () => {
  let component: WorkQaComponent;
  let fixture: ComponentFixture<WorkQaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkQaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
