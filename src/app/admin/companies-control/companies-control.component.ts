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
  errMessage: string;
   addFormOpened = false;
public companies: Company[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    getCompanies()
  }
  addNewCompany(name: string, type: string) {
    this.adminService.addNewCompany(name, type).subscribe(data => this.err('Компания добавлена'),
      error => {
      if (error.status == 400) this.err('Компания уже существует');
      }
    );
  }
  delete(comp: Company) {
    this.adminService.deleteCompany(comp).subscribe(data => this.companies = this.companies.filter(c => !c.name.localeCompare(comp.name)));
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }

  refresh(){
    this.addFormOpened = ! this.addFormOpened;
    if (this.addFormOpened) return;
    this.companies = [];
    getCompanies();
  }
}
function getCompanies() {
  this.adminService.getCompanies().subscribe( (data: Response) => {
    const res = JSON.parse(JSON.stringify(data));
    for (let i in res ) {
      let comp =new Company(res[i]['name'], res[i]['type']);
      this.companies.push(comp);
    }
  }, error => this.err('Ошибка при загрузке компаний'));
}
