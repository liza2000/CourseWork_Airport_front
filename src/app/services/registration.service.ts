import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(public httpClient: HttpClient) {}
  getPassenger(pass: string, flgt: number) {
    return this.httpClient.post('jk', {passport: pass, flightID: flgt}, {headers: RegistrationService.getHeaders()});
  }
  toRegistrate(psg: Passenger, flgt: string) {
    return this.httpClient.post('jk', {passport: psg.passport, totalWeight: psg.totalWeight, flightID: flgt},
      {headers: RegistrationService.getHeaders()});
  }
}
