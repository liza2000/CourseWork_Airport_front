import { Component, OnInit } from '@angular/core';
import {Passenger} from '../../model/passenger';
import {Flight} from '../../model/flight';
import {BookTicketsService} from '../../services/book-tickets.service';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {Book} from '../../model/book';

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.scss']
})
export class ChangeBookComponent implements OnInit {
  flight: Flight;
passengers: Passenger[] = [];
contactInfo: string;
bookID: string;
book: Book = new Book();
  constructor(private bookService: BookTicketsService, private betweenCompService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenCompService.currentBookID.subscribe(data => this.bookID = data);
    this.bookService.getBook(this.bookID).subscribe(data => this.book = data as Book);
    this.passengers = this.book.passengers;
  }
  setSeat(pass: Passenger, value: string) {
    pass.seat = value;
  }

  setRoom(pass: Passenger, value: string) {
    pass.waitingRoom = value;
  }
  setBaggage(pass: Passenger, value: string) {
    pass.max_weight = Number(value);
  }
  setContact(v) {
    this.contactInfo = v;
    this.bookService.changeContactInfo(this.contactInfo);
  }
  change(p: Passenger) {
    this.bookService.changeTicket(p, this.bookID);
  }
  delete(p: Passenger) {
    this.bookService.deleteTicket(p, this.bookID);
  }
}
