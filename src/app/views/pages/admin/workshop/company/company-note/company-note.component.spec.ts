import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNoteComponent } from './company-note.component';

describe('CompanyNoteComponent', () => {
  let component: CompanyNoteComponent;
  let fixture: ComponentFixture<CompanyNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
