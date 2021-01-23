import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';
import {AppComponent} from '../app.component';

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
    return this.httpClient.post(AppComponent.API_URL + 'auth/schedule/', {passport: pass}, {headers: ScheduleService.getHeaders()});
  }
  getPosition(id: string) {
    return this.httpClient.post(AppComponent.API_URL + 'auth/', {passport: id}, {headers: ScheduleService.getHeaders()});
  }
}
