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
//   public flight: Flight = new Flight('1','dd','dd','2020-12-08T22:00:00','2020-12-08T22:00:00','3','2020-12-08T22:00:00','2020-12-08T22:00:00','dd','sd');
  // public flight1: Flight = new Flight();
  public allflights: Flight[] = [];
  public puncts: string[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)),
        error => this.err('ошибка при загрузке пунктов'));
    this.adminService.getFlights().subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let flight = new Flight(res[i]['id'], res[i]['dep'], res[i]['arr'],
          res[i]['deptime'],res[i]['arrtime'], res[i]['count'],res[i]['actualArrtime'],res[i]['actualDeptime'],res[i]['aircraft'],res[i]['status']);
        flight.actualArrtime.setHours(flight.actualArrtime.getHours()+3);
        flight.actualDeptime.setHours(flight.actualDeptime.getHours()+3);
        flight.deptime.setHours(flight.deptime.getHours()+3);
        flight.arrtime.setHours(flight.arrtime.getHours()+3);
        this.allflights.push(flight);
      }
    } , error => this.err('Ошибка при загрузке полётов'));
    // this.allflights.push(this.flight);
    // this.flight.actualArrtime.setHours(this.flight.actualArrtime.getHours()+3);
    // this.flight.actualDeptime.setHours(this.flight.actualDeptime.getHours()+3);
    // this.flight.deptime.setHours(this.flight.deptime.getHours()+3);
    // this.flight.arrtime.setHours(this.flight.arrtime.getHours()+3);
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
    flt.deptime.setFullYear(flight.deptime.getFullYear(),flight.deptime.getMonth(),flight.deptime.getDate());
    flt.deptime.setTime(flight.deptime.getTime());
    flt.arrtime.setFullYear(flight.arrtime.getFullYear(),flight.arrtime.getMonth(),flight.arrtime.getDate());
    flt.arrtime.setTime(flight.arrtime.getTime());
    flt.actualDeptime.setFullYear(flight.actualDeptime.getFullYear(),flight.actualDeptime.getMonth(),flight.actualDeptime.getDate());
    flt.actualDeptime.setTime(flight.actualDeptime.getTime());
    flt.actualArrtime.setFullYear(flight.actualArrtime.getFullYear(),flight.actualArrtime.getMonth(),flight.actualArrtime.getDate());
    flt.actualArrtime.setTime(flight.actualArrtime.getTime());
    flt.actualArrtime.setHours(flt.actualArrtime.getHours()-3);
    flt.actualDeptime.setHours(flt.actualDeptime.getHours()-3);
    flt.deptime.setHours(flt.deptime.getHours()-3);
    flt.arrtime.setHours(flt.arrtime.getHours()-3);
    this.adminService.changeFlight(flt).subscribe(data => {
      this.err('Данные изменены')
    }, error => {
     this.err('Данные некорректны');
    });
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
  refresh(){
    this.addFormOpened = !this.addFormOpened;
    if (this.addFormOpened) return;
    this.allflights = [];
    this.adminService.getFlights().subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let flight = new Flight(res[i]['id'], res[i]['dep'], res[i]['arr'],
          res[i]['deptime'],res[i]['arrtime'], res[i]['count'],res[i]['actualArrtime'],res[i]['actualDeptime'],res[i]['aircraft'],res[i]['status']);
        flight.actualArrtime.setHours(flight.actualArrtime.getHours()+3);
        flight.actualDeptime.setHours(flight.actualDeptime.getHours()+3);
        flight.deptime.setHours(flight.deptime.getHours()+3);
        flight.arrtime.setHours(flight.arrtime.getHours()+3);
        this.allflights.push(flight);
      }
    } , error => this.err('Ошибка при загрузке полётов'));
    }
}
