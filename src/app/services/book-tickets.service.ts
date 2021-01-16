import {ApplicationModule, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Passenger} from '../model/passenger';
import {Flight} from '../model/flight';
import {Book} from '../model/book';
import {Observable} from 'rxjs';

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

  sendBook(contactInfo: string, pass: Passenger[], fl: Flight, cnt: number) {
  const body = {
  contact: contactInfo,
  passengers: pass,
  flight: fl.id,
  count: cnt
  };
  return this.httpClient.post('jk', body, {headers: BookTicketsService.getHeaders()});
  }
  getBook(id: string) {
   return this.httpClient.get('bb?id=' + id, {headers: BookTicketsService.getHeaders()});
  }
  changeTicket(p: Passenger, bookID: string) {
    const body = {
      passport: p.passport,
      seat: p.seat,
      room: p.waitingRoom,
      maxweight: p.maxWeight,
      book: bookID
    };
    return this.httpClient.post('mnm', body, {headers: BookTicketsService.getHeaders()});
  }
}
