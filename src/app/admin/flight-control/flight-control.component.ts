import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {
  errMessage: string;
  addFormOpened = false;
  public allflights: Flight[] = [];
  public puncts: string[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)),
        error => this.err('ошибка при загрузке пунктов'));
     this.getFlights()
  }
  setTime(dt: string,time: string, date: Date) {
   let d = new Date(dt);
      date.setFullYear(d.getFullYear());
    date.setMonth(d.getMonth());
   date.setDate(d.getDate());
    date.setHours(Number(time.substr(0, 2))+3, Number(time.substr(3, 2)));
  }
  setDate(date: string, flightDate: Date) {
   let d = new Date(date);
    flightDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
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
  setStatus(stat: string, flight: Flight){
    flight.status = stat;
  }
  addNew(aircraft: string, depDate: string, depTime: string, arrdate: string, arrtime: string, dep: string, arr: string) {
    const scheduleDep = new Date(depDate + 'T' + depTime);
    const scheduleArr = new Date(arrdate + 'T' + arrtime);
    this.adminService.addNewFlight(aircraft, scheduleDep, scheduleArr, dep, arr).subscribe(data => this.err('Полёт добавлен'), error => {
      this.err('Данные некорректны');
    });
  }
  delete(id: number) {
    this.adminService.deleteFlight(id).subscribe(data => this.allflights = this.allflights.filter(f => f.id!=id));
  }
  change(flight: Flight) {
    let flt = new Flight(flight.id.toString(),flight.dep,flight.arr,flight.deptime.toLocaleDateString(),
    flight.arrtime.toLocaleDateString(),flight.count.toString(),flight.actualArrtime.toLocaleDateString(),
    flight.actualDeptime.toLocaleDateString(),flight.aircraft,flight.status);
    this.copyTimeWithCorrectTimezone('depTime', flight, flt);
    this.copyTimeWithCorrectTimezone('arrtime', flight, flt);
    this.copyTimeWithCorrectTimezone('actualDeptime', flight, flt);
    this.copyTimeWithCorrectTimezone('actualArrtime', flight, flt);
    this.adminService.changeFlight(flt).subscribe(data => {
      this.err('Данные изменены')
    }, error => {
     this.err('Данные некорректны');
    });
  }

  copyTimeWithCorrectTimezone(timeProperty: string, src: Flight, dest: Flight){
    dest[timeProperty].setFullYear(src[timeProperty].getFullYear(),src[timeProperty].getMonth(),src[timeProperty].getDate());
    dest[timeProperty].setTime(src[timeProperty].getTime());
    dest[timeProperty].setHours(src[timeProperty].getHours()-3);
  }

  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
  refresh(){
    this.addFormOpened = !this.addFormOpened;
    if (this.addFormOpened) return;
    this.allflights = [];
    this.getFlights()
    }

    getFlights(){
      this.adminService.getFlights().subscribe((data: Response) => {
        const res = JSON.parse(JSON.stringify(data));
        for (let i in res ) {
          let flight = Flight.init(res[i]);
          flight.actualArrtime.setHours(flight.actualArrtime.getHours()+3);
          flight.actualDeptime.setHours(flight.actualDeptime.getHours()+3);
          flight.deptime.setHours(flight.deptime.getHours()+3);
          flight.arrtime.setHours(flight.arrtime.getHours()+3);
          this.allflights.push(flight);
        }
      } , error => this.err('Ошибка при загрузке полётов'));
    }
}
