import { Component, OnInit } from '@angular/core';
import {Aircraft} from '../../model/aircraft';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-aircraft-control',
  templateUrl: './aircraft-control.component.html',
  styleUrls: ['./aircraft-control.component.css']
})
export class AircraftControlComponent implements OnInit {
  errMessage: string;
  addFormOpened = false;
// public aircraft: Aircraft = new Aircraft();
//   public aircraft1: Aircraft = new Aircraft();
  public aircrafts: Aircraft[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    // this.aircrafts.push(this.aircraft);
    // this.aircrafts.push(this.aircraft1);
    this.adminService.getAircrafts().subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let aircraft = new Aircraft(res[i]['company'], res[i]['id'], res[i]['location'], res[i]['aircraftmodel']);
        this.aircrafts.push(aircraft);
      }
    }, error => this.err('Ошибка при загрузке самолётов'));
  }

  setModel(model: string, aircraft: Aircraft) {
    aircraft.aircraftmodel = model;
  }
  setCompany(company: string, aircraft: Aircraft) {
    aircraft.company = company;
  }
  delete(id) {
    this.adminService.deleteAircraft(id).subscribe(data => this.aircrafts = this.aircrafts.filter(aircraft => !aircraft.id.localeCompare(id)));
  }
  change(aircraft: Aircraft) {
    this.adminService.changeAircraft(aircraft).subscribe(data => this.err('Самолёт изменён'), err => {
      this.err('Не удалось изменить')
    });
  }
  addNew(id: string, company: string, model: string) {
    this.adminService.addNewAircraft(id, model, company).subscribe(data => this.err('Самолёт добавлен'), err => {
      if (err.status==404)
        this.err('Компания не найдена');
      if (err.status==400)
        this.err('Самолёт уже существует');
  })
  }
  refresh(){
    this.addFormOpened = !this.addFormOpened;
    if(this.addFormOpened) return;
    this.aircrafts = [];
    this.adminService.getAircrafts().subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      for (let i in res ) {
        let aircraft = new Aircraft(res[i]['company'], res[i]['id'], res[i]['location'], res[i]['aircraftmodel']);
        this.aircrafts.push(aircraft);
      }
    }, error => this.err('Ошибка при загрузке самолётов'));
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }

}
