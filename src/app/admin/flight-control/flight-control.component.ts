import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {
  addFormOpened = false;
  public flight: Flight = new Flight();
  public flight1: Flight = new Flight();
  public allflights: Flight[] = [];
  constructor() { }

  ngOnInit() {
    this.allflights.push(this.flight);
    this.allflights.push(this.flight1);
  }
  setTime(time: string, date: Date) {
    date.setHours(Number(time.substr(0, 2)), Number(time.substr(3, 2)));
  }
  setDate(date: string, flightDate: Date) {
    flightDate.setFullYear(new Date(date).getFullYear());
  }
  setArr(arr: string, flight: Flight) {
    flight.arr = arr;
  }
  setDep(dep: string, flight: Flight) {
    flight.dep = dep;
  }
  setAircraft(aircraft: string, flight: Flight) {
     flight.aircraft = aircraft;
  }

}
