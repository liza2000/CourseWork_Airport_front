import { Component, OnInit } from '@angular/core';
import {Employer} from '../../model/employer';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {AdminService} from '../../services/admin.service';
import {Aircraft} from '../../model/aircraft';
import {PersonalData} from '../../model/personal-data';

@Component({
  selector: 'app-employee-control',
  templateUrl: './employee-control.component.html',
  styleUrls: ['./employee-control.component.css']
})
export class EmployeeControlComponent implements OnInit {
  errMessage: string;
  addFormOpened = false;
  sheduleOpened = false;
    // employer: Employer = new Employer();
    // employer1: Employer = new Employer();
    employeers: Employer[] = [];
  constructor( private service: BetweenComponentsService, private adminService: AdminService) { }

  ngOnInit() {
    // this.employeers.push(this.employer);
    // this.employeers.push(this.employer1);
    this.adminService.getEmployers().subscribe((data: Response) => {
        const res = JSON.parse(JSON.stringify(data));
        for (let i in res ) {
          let employee = new Employer( new PersonalData(res[i]['passport'],res[i]['name'], res[i]['surname'], res[i]['pathronymic']), res[i]['company'], res[i]['position']);
          this.employeers.push(employee);
        }
      },
        error => this.err('Ошибка при загрузке сотрудников'));
  }
  openSchedule(emp: Employer) {
    this.sheduleOpened = true;
    this.service.sendEmployer(emp);
  }
  setProperty(propname: string, value: string, emp: Employer) {
    emp[propname] = value;
  }
  addNewEmpl(passport: string, name: string, surname: string, pathronymic: string, position: string, company) {
    this.adminService.addNewEmpl(passport, name, surname, pathronymic, position, company).subscribe(data => this.err('Сотрудник добавлен'),
      error => {
      if (error.status == 404) this.err('Компании не существует');
        if (error.status == 400) this.err('Сотрудник с таким паспортом уже есть');
      });
  }
  delete(passport: string) {
    this.adminService.deleteEmpl(passport).subscribe(data => this.employeers = this.employeers.filter(e => !e.personalData.passport.localeCompare(passport)));
  }
  change(empl: Employer) {
    this.adminService.changeEmployee(empl).subscribe(data => this.err('Данные изменены'));
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
  refresh(){
    this.addFormOpened = !this.addFormOpened;
    if (this.addFormOpened) return;
    this.employeers = [];
    this.adminService.getEmployers().subscribe((data: Response) => {
        const res = JSON.parse(JSON.stringify(data));
        for (let i in res ) {
          let employee = new Employer( new PersonalData(res[i]['passport'],res[i]['name'], res[i]['surname'], res[i]['pathronymic']), res[i]['company'], res[i]['position']);
          this.employeers.push(employee);
        }
      },
      error => this.err('Ошибка при загрузке сотрудников'));
  }
}
