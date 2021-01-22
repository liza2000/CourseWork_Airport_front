import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(public httpClient: HttpClient) {}
  getSchedule(pass: string) {
    return this.httpClient.post('jk', {passport: pass}, {headers: ScheduleService.getHeaders()});
  }
  getPosition(id: string) {
    return this.httpClient.post('jk', {passport: id}, {headers: ScheduleService.getHeaders()});
  }
}
