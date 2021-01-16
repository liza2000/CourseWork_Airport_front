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
book: Book;
  constructor(private bookService: BookTicketsService, private betweenCompService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenCompService.currentBookID.subscribe(data => this.bookID = data);
    this.bookService.getBook(this.bookID).subscribe(data => this.book = data as Book);
    for (let i = 0; i < this.book.count; i++) {
      this.passengers.push(new Passenger());
    }
  }
  setSeat(pass: Passenger, value: string) {
    pass.seat = value;
  }

  setRoom(pass: Passenger, value: string) {
    pass.waitingRoom = value;
  }
  setBaddage(pass: Passenger, value: string) {
    pass.maxWeight = Number(value);
  }
  setContact(v) {
    this.contactInfo = v;
  }
  change(p: Passenger, bookID: string) {
    this.bookService.changeTicket(p, bookID);
  }
  delete(p: Passenger) {
    // todo удаление билета
  }
}
