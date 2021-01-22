import { Component, OnInit } from '@angular/core';
import {WorkAtTime} from '../../model/work-at-time';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {Employer} from '../../model/employer';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-lend-shedule-control',
  templateUrl: './lend-shedule-control.component.html',
  styleUrls: ['./lend-shedule-control.component.css']
})
export class LendSheduleControlComponent implements OnInit {
  employer: Employer;
  addFormOpened = false;
  public work: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-01-11T11:00:00'), new Date('2021-01-11T23:00:00'));
  public work1: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-12-08T21:00:00'), new Date('2020-12-08T22:00:00'));
  public schedule: WorkAtTime[] = [];
  constructor( private service: BetweenComponentsService, private adminService: AdminService) { }

  ngOnInit() {
    this.schedule.push(this.work);
    this.schedule.push(this.work1);
    this.service.currentEmployer.subscribe(message => this.employer = message);
    this.adminService.getSchedule(this.employer.passport).subscribe(data => this.schedule = data as WorkAtTime[]);
  }
  public delete(work: WorkAtTime) {
    this.adminService.deleteWork(work.flight, this.employer.passport);
  }
  public change(work: WorkAtTime) {
    this.adminService.changeWork(work, this.employer.passport);
  }
  public setGate(gate: string, work: WorkAtTime) {
    work.gate = Number(gate);
  }
  public setStartDate(date: string, work: WorkAtTime) {
    work.start.setFullYear(new Date(date).getFullYear());
  }
  public setStartTime(time: string, work: WorkAtTime) {
    work.start.setHours(Number(time.substr(0, 2)), Number(time.substr(3, 2)));
  }
  public setFinishDate(date: string, work: WorkAtTime) {
    work.finish.setFullYear(new Date(date).getFullYear());
  }
  public setFinishTime(time: string, work: WorkAtTime) {
    work.finish.setHours(Number(time.substr(0, 2)), Number(time.substr(3, 2)));
  }
  addNew(flight: string, startDate: string, startTime: string, finishDate: string, finishTime: string, gate: string) {
    const start = new Date(startDate + 'T' + startTime);
    const finish = new Date(finishDate + 'T' + finishTime);
    this.adminService.addNewSchedule(this.employer.passport, flight, start, finish, gate);
  }

}
