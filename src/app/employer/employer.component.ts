import { Component, OnInit } from '@angular/core';
import {WorkAtTime} from '../model/work-at-time';
import {Router} from '@angular/router';
import {BetweenComponentsService} from '../services/betweenComponents.service';
import {ScheduleService} from '../services/schedule.service';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  // public work: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-01-11T11:00:00'), new Date('2021-01-11T23:00:00'));
  // public work1: WorkAtTime = new WorkAtTime(1, 1, new Date('2021-12-08T21:00:00'), new Date('2020-12-08T22:00:00'));
  public schedule: WorkAtTime[] = [];
  public isReady = false;
  public isReg;
  constructor(private router: Router, private betweenComponentsService: BetweenComponentsService,
              private scheduleService: ScheduleService) { }
  ngOnInit() {
    if (localStorage.getItem('CurrentEmpl') == null) { this.router.navigate(['/main']); }
    this.isReg = localStorage.getItem('PositionOfCurrentEmpl') === 'reception';
    // this.schedule.push(this.work);
    // this.schedule.push(this.work1);
    this.scheduleService.getSchedule(localStorage.getItem('CurrentEmpl')).subscribe(data => this.schedule = data as WorkAtTime[],
        error => alert('Ошибка при получении расписания'));
  }
 checkActualWork(work: WorkAtTime) {
    const date: Date = new Date();
    //return date < work.finish && date > work.start;
   return true;
  }
  public toRegistration(flight: number) {
    this.betweenComponentsService.sendFlight(flight);
    this.isReady = true;
  }

}
