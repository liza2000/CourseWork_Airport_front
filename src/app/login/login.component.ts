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
    this.schedService.getPosition(id).subscribe(data => {
      pos = data as string;
      console.log(pos)
      if (!pos.localeCompare('reception') && !pos.localeCompare('gate')) {
        alert('Такого сотрудника не существует');
        return;
      } //todo закомменчивайте эту строку если тестите сотрудников
      localStorage.setItem('CurrentEmpl', id);
      localStorage.setItem('PsitoionOfCurrentEmpl', pos);
      this.router.navigate(['/employer']);
    })
  }

}
