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
  public puncts: string[] = [];

  public bookMode = false;
  ngOnInit() {
    this.flightService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)));
    this.allflights.push(this.flight);
    this.allflights.push(this.flight1);
  }
  searchFlights(dep: string, arr: string, date: string, count: string) {
this.flightService.getFlights(dep, arr, new Date(date), Number(count))
  .subscribe(data => ( data as Flight[]).forEach(f => this.allflights.push(f)));
this.bookMode = false;
  }
  public toBook(flight: number) {
    this.bookService.sendFlight(flight);
  }
  loadBook(val: string) {
    this.bookService.sendBookID(val);
  }
}
