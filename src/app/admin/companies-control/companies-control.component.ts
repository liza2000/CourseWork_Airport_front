import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/company';
import {AdminService} from '../../services/admin.service';
import {Aircraft} from '../../model/aircraft';

@Component({
  selector: 'app-companies-control',
  templateUrl: './companies-control.component.html',
  styleUrls: ['./companies-control.component.css']
})
export class CompaniesControlComponent implements OnInit {
   addFormOpened = false;
// public company: Company = new Company();
// public company1: Company = new Company();
public companies: Company[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    // this.companies.push(this.company);
    // this.companies.push(this.company1);
    this.adminService.getCompanies().subscribe( (data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let comp =new Company(res[i]['name'], res[i]['type']);
        this.companies.push(comp);
      }
    }, error => alert('Ошибка при загрузке компаний'));
  }
  addNewCompany(name: string, type: string) {
    this.adminService.addNewCompany(name, type);
  }
  delete(comp: Company) {
    this.adminService.deleteCompany(comp).subscribe(data => this.companies = this.companies.filter(c => !c.name.localeCompare(comp.name)));
  }

}
