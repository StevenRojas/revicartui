import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMaterialsComponent } from './work-materials.component';

describe('WorkMaterialsComponent', () => {
  let component: WorkMaterialsComponent;
  let fixture: ComponentFixture<WorkMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
