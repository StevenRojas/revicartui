import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPhotosComponent } from './work-photos.component';

describe('WorkPhotosComponent', () => {
  let component: WorkPhotosComponent;
  let fixture: ComponentFixture<WorkPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
