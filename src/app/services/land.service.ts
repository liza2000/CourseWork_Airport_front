import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';
import {AppComponent} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class LandService {
  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(public httpClient: HttpClient) {}
  getPassenger(pass: string, flgt: number) {
    return this.httpClient.post(AppComponent.API_URL + 'auth/passenger/', {passport: pass, flightID: flgt}, {headers: LandService.getHeaders()});
  }
  toLand(psg: Passenger, flgt: string) {
    return this.httpClient.post(AppComponent.API_URL + 'auth/passenger/land/', {passport: psg.passport_no,  flightID: flgt, baggageStatus: psg.status},
      {headers: LandService.getHeaders()});
  }
}
