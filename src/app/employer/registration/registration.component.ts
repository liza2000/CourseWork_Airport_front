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
  constructor(private regService: RegistrationService, private betweenComponentsService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenComponentsService.currentFlight.subscribe(message => this.flight = message);
  }
  setPassport(v: string) {
    this.passenger = new Passenger(); // todo это удалить когда пассажир начнет приходить с сервера
    this.passenger.passport_no = v;
    this.startReg = true;
    this.regService.getPassenger(v, this.flight).subscribe(data => this.passenger = data as Passenger);
  }
  setTotalWeight(v) {
    this.passenger.total_weight = Number(v.replace(',', '.'));
    if (this.passenger.total_weight > this.passenger.max_weight) {
      this.overWeight = this.passenger.total_weight - this.passenger.max_weight;
    }
  }
  toRegistrate() {
    this.regService.toRegistrate(this.passenger, this.flight.toString());
    this.passenger.passport_no = '';
    this.passenger.total_weight = 0;
    this.startReg = false;
    this.overWeight = 0;
  }


}
