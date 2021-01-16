import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendSheduleControlComponent } from './lend-shedule-control.component';

describe('LendSheduleControlComponent', () => {
  let component: LendSheduleControlComponent;
  let fixture: ComponentFixture<LendSheduleControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendSheduleControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendSheduleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
