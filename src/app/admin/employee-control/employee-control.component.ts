import { Component, OnInit } from '@angular/core';
import {Employer} from '../../model/employer';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {AdminService} from '../../services/admin.service';
import {Aircraft} from '../../model/aircraft';

@Component({
  selector: 'app-employee-control',
  templateUrl: './employee-control.component.html',
  styleUrls: ['./employee-control.component.css']
})
export class EmployeeControlComponent implements OnInit {
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
          let employee = new Employer( res[i]['passport'],res[i]['name'], res[i]['surname'], res[i]['pathronymic'], res[i]['company'], res[i]['position']);
          this.employeers.push(employee);
        }
      },
        error => alert('Ошибка при загрузке сотрудников'));
  }
  openSchedule(emp: Employer) {
    this.sheduleOpened = true;
    this.service.sendEmployer(emp);
  }
  setName(name: string, emp: Employer) {
    emp.name = name;
  }
  setSurname(surname: string, emp: Employer) {
    emp.surname = surname;
  }
  setPathronymic(pathronymic: string, emp: Employer) {
    emp.pathronymic = pathronymic;
  }
  setPosition(position: string, emp: Employer) {
    emp.position = position;
  }
  setCompany(company: string, emp: Employer) {
    emp.company = company;
  }
  addNewEmpl(passport: string, name: string, surname: string, pathronymic: string, position: string, company) {
    this.adminService.addNewEmpl(passport, name, surname, pathronymic, position, company).subscribe(data => alert('Сотрудник добавлен'),
      error => {
      if (error.status == 404) alert('Компании не существует');
        if (error.status == 400) alert('Сотрудник с таким паспортом уже есть');
      });
  }
  delete(passport: string) {
    this.adminService.deleteEmpl(passport).subscribe(data => this.employeers = this.employeers.filter(e => !e.passport.localeCompare(passport)));
  }
  change(empl: Employer) {
    this.adminService.changeEmployee(empl).subscribe(data => alert('Данные изменены'));
  }

}
