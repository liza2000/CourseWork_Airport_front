import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesControlComponent } from './companies-control.component';

describe('CompaniesControlComponent', () => {
  let component: CompaniesControlComponent;
  let fixture: ComponentFixture<CompaniesControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
