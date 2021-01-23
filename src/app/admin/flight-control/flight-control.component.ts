import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-flight-control',
  templateUrl: './flight-control.component.html',
  styleUrls: ['./flight-control.component.css']
})
export class FlightControlComponent implements OnInit {
  addFormOpened = false;
//   public flight: Flight = new Flight('1','dd','dd','2020-12-08T22:00:00','2020-12-08T22:00:00','3','2020-12-08T22:00:00','2020-12-08T22:00:00','dd','sd');
  // public flight1: Flight = new Flight();
  public allflights: Flight[] = [];
  public puncts: string[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)),
        error => alert('ошибка при загрузке пунктов'));
    this.adminService.getFlights().subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        console.log(res[i]['arr']);
        let flight = new Flight(res[i]['id'], res[i]['dep'], res[i]['arr'],
          res[i]['deptime'],res[i]['arrtime'], res[i]['count'],res[i]['actualArrtime'],res[i]['actualDeptime'],res[i]['aircraft'],res[i]['status']);
        console.log(flight);
        this.allflights.push(flight);
      }
    } , error => alert('Ошибка при загрузке полётов'));
   // this.allflights.push(this.flight);
  }
  setTime(time: string, date: Date) {
    date.setHours(Number(time.substr(0, 2)), Number(time.substr(3, 2)));
    //alert(this.flight.deptime);
  }
  setDate(date: string, flightDate: Date) {
   let d = new Date(date);
    flightDate.setFullYear(d.getFullYear());
    flightDate.setMonth(d.getMonth());
    flightDate.setDate(d.getDate());
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
  addNew(aircraft: string, depDate: string, depTime: string, arrdate: string, arrtime: string, dep: string, arr: string) {
    const scheduleDep = new Date(depDate + 'T' + depTime);
    const scheduleArr = new Date(arrdate + 'T' + arrtime);
    this.adminService.addNewFlight(aircraft, scheduleDep, scheduleArr, dep, arr);
  }
  delete(id: number) {
    this.adminService.deleteFlight(id);
  }
  change(flight: Flight) {
    this.adminService.changeFlight(flight);
  }

}
