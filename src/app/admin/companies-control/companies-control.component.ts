import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';

@Component({
  selector: 'app-companies-control',
  templateUrl: './companies-control.component.html',
  styleUrls: ['./companies-control.component.css']
})
export class CompaniesControlComponent implements OnInit {
  addFormOpened = false;
public company: Company = new Company();
public company1: Company = new Company();
public companies: Company[] = [];
  constructor() { }

  ngOnInit() {
    this.companies.push(this.company);
    this.companies.push(this.company1);
  }
  addNewCompany(name: string, type: string) {
    // todo отправить запрос
  }
  delete(comp: Company) {
    // todo удалить
  }

}
