import { Component, OnInit } from '@angular/core';
import {Flight} from '../../model/flight';
import {Passenger} from '../../model/passenger';
import {BetweenComponentsService} from '../../services/betweenComponents.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public flight: Flight;
  public passenger: Passenger;
  public overWeight = 0;
  public startReg = false;
  constructor(private bookService: BetweenComponentsService) { }

  ngOnInit() {
    this.bookService.currentFlight.subscribe(message => this.flight = message);
  }
  setPassport(v) {
    this.passenger = new Passenger();
    this.startReg = true;
    // todo тут я достаю данные чела о его багаже
  }
  setTotalWeight(v) {
    this.passenger.totalWeight = Number(v.replace(',', '.'));
    if (this.passenger.totalWeight > this.passenger.maxWeight) {
      this.overWeight = this.passenger.totalWeight - this.passenger.maxWeight;
      // todo тут я пишу сколько челу нужно доплатить
    }
  }
  toRegistrate() {
    // todo тут данные отправляются на сервер
    this.passenger.passport = '';
    this.passenger.totalWeight = 0;
    this.startReg = false;
    this.overWeight = 0;
  }


}
