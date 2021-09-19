import { Component, OnInit } from '@angular/core';
import {WorkAtTime} from '../../model/work-at-time';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {Employer} from '../../model/employer';
import {AdminService} from '../../services/admin.service';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-lend-shedule-control',
  templateUrl: './lend-shedule-control.component.html',
  styleUrls: ['./lend-shedule-control.component.css']
})
export class LendSheduleControlComponent implements OnInit {
  errMessage: string;
  employer: Employer;
  addFormOpened = false;
  // public work: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-01-11T11:00:00'), new Date('2021-01-11T23:00:00'));
  // public work1: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-12-08T21:00:00'), new Date('2020-12-08T22:00:00'));
  public schedule: WorkAtTime[] = [];
  constructor( private service: BetweenComponentsService, private adminService: AdminService) { }

  ngOnInit() {
    // this.schedule.push(this.work);
    // this.schedule.push(this.work1);
    this.service.currentEmployer.subscribe(message => this.employer = message);
    this.adminService.getSchedule(this.employer.personalData.passport).subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let work = new WorkAtTime(res[i]['flight'], res[i]['gate'], res[i]['start'], res[i]['finish']);
        work.start.setHours(work.start.getHours()+3);
        work.finish.setHours(work.finish.getHours()+3);
        this.schedule.push(work);
      }
    } );
  }
  public delete(work: WorkAtTime) {
    this.adminService.deleteWork(work.flight, this.employer.personalData.passport).subscribe(data => this.schedule = this.schedule.filter(w => w.flight!=work.flight));
  }
  public change(work: WorkAtTime) {
    let wrk = new WorkAtTime(work.flight.toString(),work.gate.toString(),'','');
    wrk.start.setFullYear(work.start.getFullYear(),work.start.getMonth(),work.start.getDate());
    wrk.start.setTime(work.start.getTime());
    wrk.finish.setFullYear(work.finish.getFullYear(),work.finish.getMonth(),work.finish.getDate());
    wrk.finish.setTime(work.finish.getTime());
    wrk.start.setHours(wrk.start.getHours()-3);
    wrk.finish.setHours(wrk.finish.getHours()-3);
    this.adminService.changeWork(wrk, this.employer.personalData.passport).subscribe(data => this.err('Смена изменена'), err => this.err('Не удалось изменить смену'));
  }
  public setGate(gate: string, work: WorkAtTime) {
    work.gate = Number(gate);
  }
  public setStartDate(date: string, work: WorkAtTime) {
    let d = new Date(date);
    work.start.setFullYear(d.getFullYear());
    work.start.setMonth(d.getMonth());
    work.start.setDate(d.getDate());
  }
  public setStartTime(dt: string, time: string, work: WorkAtTime) {
    let d = new Date(dt);
    work.start.setFullYear(d.getFullYear());
    work.start.setMonth(d.getMonth());
    work.start.setDate(d.getDate());
    work.start.setHours(Number(time.substr(0, 2))+3, Number(time.substr(3, 2)));
  }
  public setFinishDate(date: string, work: WorkAtTime) {
    let d = new Date(date);
    work.finish.setFullYear(d.getFullYear());
    work.finish.setMonth(d.getMonth());
    work.finish.setDate(d.getDate());
  }
  public setFinishTime(dt: string, time: string, work: WorkAtTime) {
    let d = new Date(dt);
    work.finish.setFullYear(d.getFullYear());
    work.finish.setMonth(d.getMonth());
    work.finish.setDate(d.getDate());
    work.finish.setHours(Number(time.substr(0, 2))+3, Number(time.substr(3, 2)));
  }
  addNew(flight: string, startDate: string, startTime: string, finishDate: string, finishTime: string, gate: string) {
    const start = new Date(startDate + 'T' + startTime);
    const finish = new Date(finishDate + 'T' + finishTime);
    this.adminService.addNewSchedule(this.employer.personalData.passport, flight, start, finish, gate).subscribe( data => this.err('Смена добавлена'),
      error => {
      if (error.status == 404) this.err('Полёт не найден');
        if (error.status == 400) this.err('Смена на этот полёт уже существует');
      });
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
  refresh(){
    this.addFormOpened = !this.addFormOpened;
    if (this.addFormOpened) return;
    this.schedule = [];
    this.adminService.getSchedule(this.employer.personalData.passport).subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let work = new WorkAtTime(res[i]['flight'], res[i]['gate'], res[i]['start'], res[i]['finish']);
        work.start.setHours(work.start.getHours()+3);
        work.finish.setHours(work.finish.getHours()+3);
        this.schedule.push(work);
      }
    } );
  }

}
