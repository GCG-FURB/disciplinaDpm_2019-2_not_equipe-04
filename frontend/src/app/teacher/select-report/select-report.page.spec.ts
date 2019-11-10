import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReportPage } from './select-report.page';

describe('SelectReportPage', () => {
  let component: SelectReportPage;
  let fixture: ComponentFixture<SelectReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
