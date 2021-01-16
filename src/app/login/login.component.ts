import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BetweenComponentsService} from '../services/betweenComponents.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: BetweenComponentsService) { }

  ngOnInit() {
  }

  reg() {
    this.service.sendEmpl(true);
  }
  land() {
    this.service.sendEmpl(false);
  }

}
