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
  errMessage: string;
  public flight: number;
  public passenger: Passenger;
  public overWeight = 0;
  public startReg = false;
  constructor(private regService: RegistrationService, private betweenComponentsService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenComponentsService.currentFlight.subscribe(message => this.flight = message);
  }
  setPassport(v: string) {
    this.passenger = new Passenger();
    this.passenger.personalData.passport = v;
    this.startReg = true;
    this.regService.getPassenger(v, this.flight).subscribe(
      (data:Response) => {
      const res = JSON.parse(JSON.stringify(data));
      this.passenger.personalData.passport = res['personalData.passport'];
      this.passenger.max_weight = res['max_weight'];
      this.passenger.status = res['status'];
    }, error => this.err('Пассажир не найден') );
  }
  setTotalWeight(v) {
    this.passenger.total_weight = Number(v.replace(',', '.'));
    if (this.passenger.total_weight > this.passenger.max_weight) {
      this.overWeight = this.passenger.total_weight - this.passenger.max_weight;
    }
  }
  toRegistrate() {
    this.regService.toRegistrate(this.passenger, this.flight.toString()).subscribe( (data: Response) => {
      this.err('Пассажир был успешно зарегестрирован')
    });
    this.passenger.personalData.passport = '';
    this.passenger.total_weight = 0;
    this.startReg = false;
    this.overWeight = 0;
    this.passenger.status = 'null';
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }


}
