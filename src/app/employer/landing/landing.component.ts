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
  errMessage: string;
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
    this.passenger.personalData.passport = v;
    this.landService.getPassenger(v, this.flight).subscribe((data:Response) => {
      const res = JSON.parse(JSON.stringify(data));
      this.passenger.personalData.passport = res['passport_no'];
      this.passenger.max_weight = res['max_weight'];
      this.passenger.status = res['status'];
    }, error => this.err('Данный пассажир не зарегестрирован на рейс') );
  }

  toLand() {

  if (this.passenger.status!='null')  this.landService.toLand(this.passenger, this.flight.toString()).subscribe((data: Response) => {
    this.err('Пассажир прошел контроль')
  });
    this.passenger.personalData.passport = '';
    this.passenger.status = 'null';

  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
}
