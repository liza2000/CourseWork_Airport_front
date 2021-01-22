import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BetweenComponentsService} from '../services/betweenComponents.service';
import {ScheduleService} from '../services/schedule.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: BetweenComponentsService, private schedService: ScheduleService) { }

  ngOnInit() {
  }
  login(id) {
    let pos: string;
    this.schedService.getPosition(id).subscribe(data => pos = data as string,
        error => {alert('Такого сотрудника не существует'); return; });
    if (pos === 'null') { alert('Такого сотрудника не существует');  return; }
    localStorage.setItem('CurrentEmpl', id);
    localStorage.setItem('PositionOfCurrentEmpl', pos);
    this.router.navigate(['/employer']);
  }

}
