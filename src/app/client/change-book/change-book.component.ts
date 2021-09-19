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
  errMessage: string;
  flight: Flight;
passengers: Passenger[] = [];
bookID: string;
book: Book = new Book();
  constructor(private bookService: BookTicketsService, private betweenCompService: BetweenComponentsService) { }

  ngOnInit() {
    this.betweenCompService.currentBookID.subscribe(data => this.bookID = data);
    this.bookService.getBook(this.bookID).subscribe((data: Response) => {
      const res = JSON.parse(JSON.stringify(data));
      this.book = new Book();
      this.book.id = res['id'];
      this.book.amount = res['amount'];
      this.book.contact = res['contact'];
      this.book.arrTime = new Date(res['arrTime']);
      this.book.depTime = new Date(res['depTime']);
      this.book.arrAirport = res['arrAirport'];
      this.book.depAirport = res['depAirport'];
      for (let i in res['passengers'] ) {
        let passenger = new Passenger();
        passenger.personalData.name = res['passengers'][i]['name'];
        passenger.personalData.surname = res['passengers'][i]['surname'];
        passenger.personalData.pathronymic = res['passengers'][i]['pathronymic'];
        passenger.max_weight = res['passengers'][i]['max_weight'];
        passenger.seat = res['passengers'][i]['seat'];
        passenger.waitingRoom = res['passengers'][i]['waitingRoom'];
        this.book.passengers.push(passenger);
      }
    }, error =>  this.err('Ошибка при загрузке брони'));
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
    this.book.contact = v;
    this.bookService.changeContactInfo(this.book.contact).subscribe();
  }
  change(p: Passenger) {
    this.bookService.changeTicket(p, this.bookID);
  }
  // calculate(){
  //   this.bookService.calculate(this.book.flight, this.book.passengers).subscribe(data =>  this.totalAmount = data as number);
  // }
  delete(p: Passenger) {
    this.bookService.deleteTicket(p, this.bookID);
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
}
