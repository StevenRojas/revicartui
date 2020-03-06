import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusCommentComponent } from './work-status-comment.component';

describe('WorkStatusCommentComponent', () => {
  let component: WorkStatusCommentComponent;
  let fixture: ComponentFixture<WorkStatusCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkStatusCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStatusCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
