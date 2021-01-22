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

  constructor(public betweenComponentsService: BetweenComponentsService, public flightService: FlightsSearchService) { }
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
  .subscribe((data: Response) => {
    const res = JSON.parse(JSON.stringify(data.body));
    for (let i in res ) {
      this.allflights.push(new Flight(res[i]['id'], res[i]['dep'], res[i]['arr'],
        res[i]['deptime'],res[i]['arrtime'], res[i]['count']));
    }
  } );
this.bookMode = false;
  }
  public toBook(flight: Flight) {
    this.betweenComponentsService.sendFlight(flight.id);
    this.betweenComponentsService.sendCount(flight.count);
  }
  loadBook(val: string) {
    this.betweenComponentsService.sendBookID(val);
  }
}
