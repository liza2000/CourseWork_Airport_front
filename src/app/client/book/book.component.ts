import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {Passenger} from '../../model/passenger';
import {BookTicketsService} from '../../services/book-tickets.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, AfterViewInit {
public flight: number;
public passengers: Passenger[] = [] ;
public contactInfo: string;
public bookKey;
countOfBusiness: number;
countOfEconomy: number;
currentBus: number;
currentEc: number;
limit: number;
totalAmount: number = 0;
public count;
  constructor(private betweenComponentsService: BetweenComponentsService, private bookTicketsService: BookTicketsService) { }

  ngOnInit() {
    this.betweenComponentsService.currentFlight.subscribe(message => this.flight = message);
    this.betweenComponentsService.currentCount.subscribe(message => this.limit = message);
    this.passengers.push(new Passenger());
    this.count = 1;
  }

  ngAfterViewInit(): void {
    this.bookTicketsService.getCountOfBusinessSeats(this.flight).subscribe(data => {
        this.countOfBusiness = JSON.parse(JSON.stringify(data))['seats'] as number;
        console.log(this.countOfBusiness);
      this.currentBus = this.countOfBusiness;
      this.countOfEconomy = this.limit - this.countOfBusiness;
      this.currentEc =  this.countOfEconomy;
      }
    );
  }

  sendBook() {
   this.bookTicketsService.sendBook(this.contactInfo, this.passengers, this.flight)
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
    this.bookTicketsService.calculate(this.flight, this.passengers).subscribe(data =>  this.totalAmount = data as number);
  }
  changeSeat(){
    let ec = 0;
    let bus = 0;
    this.passengers.forEach(p => {if (p.seat=='economy') ec++;});
    this.passengers.forEach(p => {if (p.seat=='business') bus++;});
    this.currentEc = this.countOfEconomy - ec;
    this.currentBus = this.countOfBusiness - bus;
  }

}
