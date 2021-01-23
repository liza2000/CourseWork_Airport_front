import {ApplicationModule, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';
import {Flight} from '../model/flight';
import {Book} from '../model/book';
import {Observable} from 'rxjs';
import {AppComponent} from '../app.component';

@Injectable()
export class BookTicketsService {
  private static getHeaders(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  constructor(public httpClient: HttpClient) { }

  sendBook(contactInfo: string, pass: Passenger[], fl: number) {
  const body = {
  contact: contactInfo,
  passengers: pass,
  flight: fl
  };
  return this.httpClient.post(AppComponent.API_URL + 'flight/booking/', body, {headers: BookTicketsService.getHeaders()});
  }
  getBook(id: string) {
   return this.httpClient.get('bb?id=' + id, {headers: BookTicketsService.getHeaders()});
  }
  changeTicket(p: Passenger, bookID: string) {
    const body = {
      passport: p.passport_no,
      seat: p.seat,
      room: p.waitingRoom,
      maxweight: p.max_weight,
      book: bookID
    };
    return this.httpClient.post('mnm', body, {headers: BookTicketsService.getHeaders()});
  }
  deleteTicket(p: Passenger, bookID: string) {
    const body = {
      passport: p.passport_no,
      book: bookID
    };
    return this.httpClient.post('mnm', body, {headers: BookTicketsService.getHeaders()});
  }
  changeContactInfo(info: string) {
    return this.httpClient.post('mnm', {contact: info}, {headers: BookTicketsService.getHeaders()});
  }
  getCountOfBusinessSeats(flight: number) {
    return this.httpClient.post(AppComponent.API_URL + 'flight/booking/business/', {id: flight}, {headers: BookTicketsService.getHeaders()});
  }
  calculate(id: number, pass: Passenger[]){
    return this.httpClient.post(AppComponent.API_URL + 'flight/booking/price/', {flight: id, passengers:pass}, {headers: BookTicketsService.getHeaders()});
  }
}
