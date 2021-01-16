import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightControlComponent } from './flight-control.component';

describe('FlightControlComponent', () => {
  let component: FlightControlComponent;
  let fixture: ComponentFixture<FlightControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
