import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employer} from '../model/employer';
import {Aircraft} from '../model/aircraft';
import {Company} from '../model/company';
import {Flight} from '../model/flight';
import {WorkAtTime} from '../model/work-at-time';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getPuncts() {
    return this.httpClient.get(AppComponent.API_URL + 'flight/search/direction/', {headers: AdminService.getHeaders()});
  }
  getAircrafts() {
   return  this.httpClient.get(AppComponent.API_URL + 'admin/aircraft/get/', {headers: AdminService.getHeaders()});
  }
  getCompanies() {
   return  this.httpClient.get(AppComponent.API_URL + 'admin/companies/get/', {headers: AdminService.getHeaders()});
  }
  getEmployers() {
    return this.httpClient.get(AppComponent.API_URL + 'admin/employee/get/', {headers: AdminService.getHeaders()});
  }
  getFlights() {
   return  this.httpClient.get(AppComponent.API_URL  + 'admin/flight/get/', {headers: AdminService.getHeaders()});
  }
  getSchedule(passport: string) {
   return  this.httpClient.get(AppComponent.API_URL  + 'admin/schedule/get/'+passport, {headers: AdminService.getHeaders()});
  }
  addNewAircraft(airid: string, mod: string, comp: string) {
    const body = {
      id: airid,
      model: mod,
      company: comp
    };
    return  this.httpClient.post(AppComponent.API_URL  + 'admin/aircraft/add/', body, {headers: AdminService.getHeaders()});
  }
  addNewEmpl(pass: string, n: string, s: string, p: string, pos: string, comp: string) {
    const body = {
      passport: pass,
        name: n,
      surname: s,
      pathronymic: p,
      position: pos,
      company: comp
    };
    return  this.httpClient.post(AppComponent.API_URL  + 'admin/employee/add/', body, {headers: AdminService.getHeaders()});
  }
  addNewFlight(air: string, depT: Date, arrT: Date, dep: string, arr: string) {
    const body = {
      aircraft_id: air,
      schedule_departure: depT,
      schedule_arrival: arrT,
      departure_airport: dep,
      arrival_airport: arr
    };
    return  this.httpClient.post(AppComponent.API_URL + 'admin/flight/add/', body, {headers: AdminService.getHeaders()});
  }
  addNewSchedule(empl: string, flt: string, start: Date, finish: Date, gt: string) {
    const body = {
      employee_id: empl,
      flight_id: flt,
      start_time: start,
      finish_time: finish,
      gate: gt
    };
    return  this.httpClient.post(AppComponent.API_URL  + 'admin/schedule/add/', body, {headers: AdminService.getHeaders()});
  }
  addNewCompany(nm: string, t: string) {
    const body = {
      name: nm,
      type: t
    };
    return  this.httpClient.post(AppComponent.API_URL + 'admin/companies/add/', body, {headers: AdminService.getHeaders()});
  }
  deleteAircraft(aircraft: string) {
   return  this.httpClient.post(AppComponent.API_URL + 'admin/aircraft/delete/', {id: aircraft}, {headers: AdminService.getHeaders()});
  }
  changeAircraft(aircraft: Aircraft) {
   return  this.httpClient.post(AppComponent.API_URL + 'admin/aircraft/change/', {id: aircraft.id, owner_id: aircraft.company, model: aircraft.aircraftmodel}, {headers: AdminService.getHeaders()});
  }
  deleteCompany(comp: Company) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/companies/delete/', {name: comp.name, type: comp.type}, {headers: AdminService.getHeaders()});
  }
  deleteEmpl(pass: string) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/employee/delete/', {passport: pass}, {headers: AdminService.getHeaders()});
  }
  changeEmployee(empl: Employer) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/employee/change/', {employee: empl}, {headers: AdminService.getHeaders()});
  }
  deleteFlight(flight: number) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/employee/delete/', {id: flight}, {headers: AdminService.getHeaders()});
  }
  changeFlight(flt: Flight) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/flight/change/', {flight: flt}, {headers: AdminService.getHeaders()});
  }
  deleteWork(flt: number, empl: string) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/schedule/delete/', {flight: flt, employee: empl}, {headers: AdminService.getHeaders()});
  }
  changeWork(wrk: WorkAtTime, empl: string) {
    return  this.httpClient.post(AppComponent.API_URL + 'admin/schedule/change/', {work: wrk, employee: empl}, {headers: AdminService.getHeaders()});
  }


}


