import { Component, OnInit } from '@angular/core';
import {Passenger} from '../../model/passenger';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {LandService} from '../../services/land.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
 public passenger: Passenger;
 public flight: number;
 constructor(public landService: LandService, public betweenComponentsService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenComponentsService.currentFlight.subscribe(message => this.flight = message);
  }

  setBaggageStatus(val) {
    this.passenger.status = val;
  }

  setPassport(v) {
    this.passenger = new Passenger();
    this.passenger.passport_no = v;
    this.landService.getPassenger(v, this.flight).subscribe(data => this.passenger = data as Passenger);
  }

  toLand() {

  if (this.passenger.status!='null')  this.landService.toLand(this.passenger, this.flight.toString());
    this.passenger.passport_no = '';
    this.passenger.status = 'null';

  }
}
