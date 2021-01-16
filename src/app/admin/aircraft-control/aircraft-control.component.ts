import { Component, OnInit } from '@angular/core';
import {Aircraft} from '../../model/aircraft';
import {Employer} from '../../model/employer';

@Component({
  selector: 'app-aircraft-control',
  templateUrl: './aircraft-control.component.html',
  styleUrls: ['./aircraft-control.component.css']
})
export class AircraftControlComponent implements OnInit {
  addFormOpened = false;
public aircraft: Aircraft = new Aircraft();
  public aircraft1: Aircraft = new Aircraft();
  public aircrafts: Aircraft[] = [];
  constructor() { }

  ngOnInit() {
    this.aircrafts.push(this.aircraft);
    this.aircrafts.push(this.aircraft1);
  }

  setModel(model: string, aircraft: Aircraft) {
    aircraft.aircraftmodel = model;
  }
  setCompany(company: string, aircraft: Aircraft) {
    aircraft.company = company;
  }

}
