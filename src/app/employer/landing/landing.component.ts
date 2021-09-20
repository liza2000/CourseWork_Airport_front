import {Component, Input, OnInit} from '@angular/core';
import {Passenger} from '../../model/passenger';
import {LandService} from '../../services/land.service';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  errMessage: string;
 public passenger: Passenger;
 public flightId: number;
  @Input('flight') flight: Flight;
 constructor(public landService: LandService) { }

  ngOnInit() {
    this.flightId = this.flight.id
  }

  setBaggageStatus(val) {
    this.passenger.status = val;
  }

  setPassport(v) {
    this.passenger = new Passenger();
    this.passenger.personalData.passport = v;
    this.landService.getPassenger(v, this.flightId).subscribe((data:Response) => {
      const res = JSON.parse(JSON.stringify(data));
      this.passenger.personalData.passport = res['passport_no'];
      this.passenger.max_weight = res['max_weight'];
      this.passenger.status = res['status'];
    }, error => this.err('Данный пассажир не зарегестрирован на рейс') );
  }

  toLand() {

  if (this.passenger.status!='null')  this.landService.toLand(this.passenger, this.flightId.toString()).subscribe((data: Response) => {
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
