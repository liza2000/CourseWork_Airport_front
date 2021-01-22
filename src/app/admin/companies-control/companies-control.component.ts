import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';
import {AdminService} from '../../services/admin.service';

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
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.companies.push(this.company);
    this.companies.push(this.company1);
    this.adminService.getCompanies().subscribe( data => data as Company[], error => alert('Ошибка при загрузке компаний'));
  }
  addNewCompany(name: string, type: string) {
    this.adminService.addNewCompany(name, type);
  }
  delete(comp: Company) {
    this.adminService.deleteCompany(comp);
  }

}
