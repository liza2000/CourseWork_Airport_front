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
public flight: number;
public passengers: Passenger[] = [] ;
public contactInfo: string;
public bookKey;
countOfBusiness: number;
limit: number;
totalAmount: number;
public count;
  constructor(private betweenComponentsService: BetweenComponentsService, private bookTicketsService: BookTicketsService) { }

  ngOnInit() {
    this.betweenComponentsService.currentFlight.subscribe(message => this.flight = message);
    this.betweenComponentsService.currentCount.subscribe(message => this.limit = message);
    this.bookTicketsService.getCountOfBusinessSeats(this.flight).subscribe(data => this.countOfBusiness = data as number);
    this.passengers.push(new Passenger());
    this.count = 1;
  }
  sendBook() {
   this.bookTicketsService.sendBook(this.contactInfo, this.passengers, this.flight, this.count)
     .subscribe(data => this.bookKey = data as number);
  }
  setContact(v) {
    this.contactInfo = v;
  }
  setPassport(pass: Passenger, value: string) {
    pass.passport_no = value;
}
  setName(pass: Passenger, value: string) {
    pass.name = value;
  }
  setSecondName(pass: Passenger, value: string) {
    pass.second_name = value;
  }
  setThirdName(pass: Passenger, value: string) {
    pass.third_name = value;
  }
  setBornDate(pass: Passenger, value: string) {
    pass.birthday = new Date(value);
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
  // calculateAmount() {
  //   this.bookTicketsService.calculate().subscribe(data =>  this.totalAmount = data as number);
  // }

}
