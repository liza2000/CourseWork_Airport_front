import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';
import {Flight} from '../model/flight';

@Injectable()
export class FlightsSearchService {
  constructor(public httpClient: HttpClient) { }
  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getPuncts(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/flight/search/direction/', {headers: FlightsSearchService.getHeaders()});
  }
  getFlights(depart: string, arrival: string, d: Date, c: number) {
    const body = {
      dep: depart,
      arr: arrival,
      date: d,
      count: c};
    return this.httpClient.post(AppComponent.API_URL + 'flight/get/', body, {headers: FlightsSearchService.getHeaders()});
  }
  }

