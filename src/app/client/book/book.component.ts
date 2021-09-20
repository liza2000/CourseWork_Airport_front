import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Passenger} from '../../model/passenger';
import {BookTicketsService} from '../../services/book-tickets.service';
import {Flight} from '../../model/flight';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, AfterViewInit {
  errMessage: string;
public flightId: number;
public passengers: Passenger[] = [] ;
public contactInfo: string;
public bookKey;
countOfBusiness: number;
countOfEconomy: number;
currentBus: number;
currentEc: number;
limit: number;
totalAmount: number = 0;
@Input('flight') flight: Flight;
public count;
  constructor(private bookTicketsService: BookTicketsService) { }

  ngOnInit() {
    this.flightId = this.flight.id;
    this.limit = this.flight.count;
    this.passengers.push(new Passenger());
    this.count = 1;
  }

  ngAfterViewInit(): void {
    this.bookTicketsService.getCountOfBusinessSeats(this.flightId).subscribe(data => {
        this.countOfBusiness = JSON.parse(JSON.stringify(data))['seats'] as number;
      this.currentBus = this.countOfBusiness;
      this.countOfEconomy = this.limit - this.countOfBusiness;
      this.currentEc =  this.countOfEconomy;
      }
    );
  }

  sendBook() {
   this.bookTicketsService.sendBook(this.contactInfo, this.passengers, this.flightId)
     .subscribe(data => {this.bookKey = data as number; alert('Бронь успешно добавлена. Номер брони: '+this.bookKey)},
         error => {this.err('Ошибка при бронировании')});
  }
  setContact(v) {
    this.contactInfo = v;
  }
  setPassport(pass: Passenger, value: string) {
    pass.personalData.passport = value;
}
  setName(pass: Passenger, value: string) {
    pass.personalData.name = value;
  }
  setSecondName(pass: Passenger, value: string) {
    pass.personalData.lastName = value;
  }
  setThirdName(pass: Passenger, value: string) {
    pass.personalData.passport = value;
  }
  setBornDate(pass: Passenger, value: string) {
    pass.birthday = new Date(value);
  }
  setSeat(pass: Passenger, value: string) {
    pass.seat = value;
    this.changeSeat();
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
    this.changeSeat();
  }
  calculateAmount() {
    this.bookTicketsService.calculate(this.flightId, this.passengers).subscribe(data =>  this.totalAmount = data as number);
  }
  changeSeat(){
    let ec = 0;
    let bus = 0;
    this.passengers.forEach(p => {if (p.seat=='economy') ec++;});
    this.passengers.forEach(p => {if (p.seat=='business') bus++;});
    this.currentEc = this.countOfEconomy - ec;
    this.currentBus = this.countOfBusiness - bus;
  }
  err(mes: string){
    this.errMessage = mes;
    setTimeout(() => {this.errMessage = null; }, 3000);
  }
}
