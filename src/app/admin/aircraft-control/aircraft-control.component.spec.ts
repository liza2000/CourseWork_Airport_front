import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftControlComponent } from './aircraft-control.component';

describe('AircraftControlComponent', () => {
  let component: AircraftControlComponent;
  let fixture: ComponentFixture<AircraftControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
