import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {Passenger} from '../../model/passenger';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {RegistrationService} from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public flight: number;
  public passenger: Passenger;
  public overWeight = 0;
  public startReg = false;
  constructor(private regService: RegistrationService, private bookService: BetweenComponentsService) { }

  ngOnInit() {
    this.bookService.currentFlight.subscribe(message => this.flight = message);
  }
  setPassport(v: string) {
    this.passenger = new Passenger();
    this.passenger.passport = v;
    this.startReg = true;
    this.regService.getPassenger(v, this.flight).subscribe(data => this.passenger = data as Passenger);
  }
  setTotalWeight(v) {
    this.passenger.totalWeight = Number(v.replace(',', '.'));
    if (this.passenger.totalWeight > this.passenger.maxWeight) {
      this.overWeight = this.passenger.totalWeight - this.passenger.maxWeight;
    }
  }
  toRegistrate() {
    this.regService.toRegistrate(this.passenger, this.flight.toString());
    this.passenger.passport = '';
    this.passenger.totalWeight = 0;
    this.startReg = false;
    this.overWeight = 0;
  }


}
