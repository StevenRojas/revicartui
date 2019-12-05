import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkResumeComponent } from './work-resume.component';

describe('WorkResumeComponent', () => {
  let component: WorkResumeComponent;
  let fixture: ComponentFixture<WorkResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
