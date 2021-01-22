import { Component, OnInit } from '@angular/core';
import {Aircraft} from '../../model/aircraft';
import {Employer} from '../../model/employer';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-aircraft-control',
  templateUrl: './aircraft-control.component.html',
  styleUrls: ['./aircraft-control.component.css']
})
export class AircraftControlComponent implements OnInit {
  addFormOpened = false;
public aircraft: Aircraft = new Aircraft();
  public aircraft1: Aircraft = new Aircraft();
  public aircrafts: Aircraft[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.aircrafts.push(this.aircraft);
    this.aircrafts.push(this.aircraft1);
    this.adminService.getAircrafts().subscribe(data => data as Aircraft[], error => alert('Ошибка при загрузке самолётов'));
  }

  setModel(model: string, aircraft: Aircraft) {
    aircraft.aircraftmodel = model;
  }
  setCompany(company: string, aircraft: Aircraft) {
    aircraft.company = company;
  }
  delete(id) {
    this.adminService.deleteAircraft(id);
  }
  change(aircraft: Aircraft) {
    this.adminService.changeAircraft(aircraft);
  }
  addNew(name: string, company: string, model: string) {
    this.adminService.addNewAircraft(name, company, model);
  }

}
