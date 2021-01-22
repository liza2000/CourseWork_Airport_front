import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employer} from '../model/employer';
import {Aircraft} from '../model/aircraft';
import {Company} from '../model/company';
import {Flight} from '../model/flight';
import {WorkAtTime} from '../model/work-at-time';

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
    return this.httpClient.get('gfg', {headers: AdminService.getHeaders()});
  }
  getAircrafts() {
   return  this.httpClient.get('url', {headers: AdminService.getHeaders()});
  }
  getCompanies() {
   return  this.httpClient.get('url', {headers: AdminService.getHeaders()});
  }
  getEmployers() {
    return this.httpClient.get('url', {headers: AdminService.getHeaders()});
  }
  getFlights() {
   return  this.httpClient.get('url', {headers: AdminService.getHeaders()});
  }
  getSchedule(passport: number) {
   return  this.httpClient.get('url', {headers: AdminService.getHeaders()});
  }
  addNewAircraft(name: string, mod: string, comp: string) {
    const body = {
      aircraft: name,
      model: mod,
      company: comp
    };
    return  this.httpClient.post('url', body, {headers: AdminService.getHeaders()});
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
    return  this.httpClient.post('url', body, {headers: AdminService.getHeaders()});
  }
  addNewFlight(air: string, depT: Date, arrT: Date, dep: string, arr: string) {
    const body = {
      aircraft_id: air,
      schedule_departure: depT,
      schedule_arrival: arrT,
      departure_airport: dep,
      arrival_airport: arr
    };
    return  this.httpClient.post('url', body, {headers: AdminService.getHeaders()});
  }
  addNewSchedule(empl: number, flt: string, start: Date, finish: Date, gt: string) {
    const body = {
      employee_id: empl,
      flight_id: flt,
      start_time: start,
      finish_time: finish,
      gate: gt
    };
    return  this.httpClient.post('url', body, {headers: AdminService.getHeaders()});
  }
  addNewCompany(nm: string, t: string) {
    const body = {
      name: nm,
      type: t
    };
    return  this.httpClient.post('url', body, {headers: AdminService.getHeaders()});
  }
  deleteAircraft(aircraft: string) {
   return  this.httpClient.post('url', {id: aircraft}, {headers: AdminService.getHeaders()});
  }
  changeAircraft(aircraft: Aircraft) {
   return  this.httpClient.post('url', {owner_id: aircraft.company, model: aircraft.aircraftmodel}, {headers: AdminService.getHeaders()});
  }
  deleteCompany(comp: Company) {
    return  this.httpClient.post('url', {name: comp.name, type: comp.type}, {headers: AdminService.getHeaders()});
  }
  deleteEmpl(pass: number) {
    return  this.httpClient.post('url', {passport: pass}, {headers: AdminService.getHeaders()});
  }
  changeEmployee(empl: Employer) {
    return  this.httpClient.post('url', {employee: empl}, {headers: AdminService.getHeaders()});
  }
  deleteFlight(flight: number) {
    return  this.httpClient.post('url', {id: flight}, {headers: AdminService.getHeaders()});
  }
  changeFlight(flt: Flight) {
    return  this.httpClient.post('url', {flight: flt}, {headers: AdminService.getHeaders()});
  }
  deleteWork(flt: number, empl: number) {
    return  this.httpClient.post('url', {flight: flt, employee: empl}, {headers: AdminService.getHeaders()});
  }
  changeWork(wrk: WorkAtTime, empl: number) {
    return  this.httpClient.post('url', {work: wrk, employee: empl}, {headers: AdminService.getHeaders()});
  }


}


