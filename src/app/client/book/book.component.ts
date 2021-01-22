import { Component, OnInit } from '@angular/core';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {Flight} from '../../model/flight';
import {Passenger} from '../../model/passenger';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {BookTicketsService} from '../../services/book-tickets.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
public flight: Flight;
public passengers: Passenger[] = [] ;
public contactInfo: string;
public bookKey;
public count;
  constructor(private bookService: BetweenComponentsService, private bookTicketsService: BookTicketsService) { }

  ngOnInit() {
    this.bookService.currentFlight.subscribe(message => this.flight = message);
    this.passengers.push(new Passenger());
    this.count = 1;
  }
  sendBook() {
   this.bookKey = this.bookTicketsService.sendBook(this.contactInfo, this.passengers, this.flight, this.count)
     .subscribe(data => (data as number).valueOf());
  }
  setContact(v) {
    this.contactInfo = v;
  }
  setPassport(pass: Passenger, value: string) {
    pass.passport = value;
}
  setName(pass: Passenger, value: string) {
    pass.name = value;
  }
  setSecondName(pass: Passenger, value: string) {
    pass.secondName = value;
  }
  setThirdName(pass: Passenger, value: string) {
    pass.thirdName = value;
  }
  setBornDate(pass: Passenger, value: string) {
    pass.bornDate = new Date(value);
    alert(pass.bornDate);
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

  changeCount(v: string) {
    const cnt = Number(v);
    if (this.count < cnt) {
    for (let i = 0; i < cnt - this.count; i++) {
      this.passengers.push(new Passenger());
    }
    }
    if (cnt < this.count) {
      for (let i = 0; i < this.count - cnt ; i++) {
        this.passengers.pop();
      }
    }
    this.count = cnt;
  }

}
