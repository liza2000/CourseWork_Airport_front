import { Component, OnInit } from '@angular/core';
import {Passenger} from '../../model/passenger';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
 public passenger: Passenger;
 constructor() { }

  ngOnInit() {
  }

  setBaggageStatus(val) {
    this.passenger.baggageStatus = val;
  }

  setPassport(v) {
   this.passenger = new Passenger();
    // todo тут я достаю данные чела о его багаже
  }

  toLand() {

  }

}
