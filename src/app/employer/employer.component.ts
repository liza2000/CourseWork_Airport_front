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
  public schedule: WorkAtTime[] = [];
  public isReady = false;
  public isReg;
  public selectedFlight;
  passport: string;
  constructor(private router: Router, private betweenComponentsService: BetweenComponentsService,
              private scheduleService: ScheduleService) { }
  ngOnInit() {
    if (localStorage.getItem('CurrentEmpl') == null) { this.router.navigate(['/main']); }
    this.passport = localStorage.getItem('CurrentEmpl');
    this.isReg = localStorage.getItem('PositionOfCurrentEmpl') === 'reception'; // todo если чекаете сотрудника регистрации тут должно быть true

    this.scheduleService.getSchedule(localStorage.getItem('CurrentEmpl')).subscribe((data: Response) => {
        const res = JSON.parse(JSON.stringify(data));
        for (let i in res ) {
          let work = new WorkAtTime(res[i]['flight'], res[i]['gate'], res[i]['start'], res[i]['finish']);
          this.schedule.push(work);
        }
      },);
  }
 checkActualWork(work: WorkAtTime) {
   return true;
  }

}
