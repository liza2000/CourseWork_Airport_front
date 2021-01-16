import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Flight} from '../../model/flight';
import {BetweenComponentsService} from '../../services/betweenComponents.service';
import {FlightsSearchService} from '../../services/flights-search.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor( public bookService: BetweenComponentsService, public flightService: FlightsSearchService) { }
  public flight: Flight = new Flight();
  public flight1: Flight = new Flight();
  public allflights: Flight[] = [];
  public currentflights: Flight[] = [];
  public puncts: string[] = [];

  public bookMode = false;
  ngOnInit() {
   // this.flightService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)));
    this.allflights.push(this.flight);
    this.allflights.push(this.flight1);
    this.currentflights = this.allflights;
    this.puncts.push('kjk');
    this.puncts.push('njgfgkj');
    this.puncts.push('kjfk');
    this.puncts.push('njkj');
  }
  searchFlights(dep: string, arr: string, date: string, count: string) {
this.flightService.getFlights(dep, arr, new Date(date), Number(count))
  .subscribe(data => ( data as Flight[]).forEach(f => this.allflights.push(f)));
this.bookMode = false;
  }
  public toBook(flight: Flight) {
    this.bookService.sendFlight(flight);
  }
  loadBook(val: string) {
    this.bookService.sendBookID(val);
  }

  //   public filterbydate(date: string) {
  //   this.currentflights = this.allflights.filter(flight => flight.arrtime.toLocaleDateString() === new Date(date).toLocaleDateString());
  //   }
  //
  //   public filterbydep(dep: string) {
  //   if (dep === 'Не выбрано') { this.currentflights = this.allflights; return; }
  //   this.currentflights = this.allflights.filter(flight => flight.dep === dep);
  //   }
  //
  // public filterbyarr(arr: string) {
  //   if (arr === 'Не выбрано') { this.currentflights = this.allflights; return; }
  //   this.currentflights = this.allflights.filter(flight => flight.arr === arr);
  // }
  // public filterbycount(count: string) {
  //   if (count === '') { this.currentflights = this.allflights; return; }
  //   this.currentflights = this.allflights.filter(flight => flight.count === Number(count));
  // }
  // public filter(date:string,dep:string,arr:string,count:string){
  // }

}
