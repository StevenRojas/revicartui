import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkThirdpartyComponent } from './work-thirdparty.component';

describe('WorkThirdpartyComponent', () => {
  let component: WorkThirdpartyComponent;
  let fixture: ComponentFixture<WorkThirdpartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkThirdpartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkThirdpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
