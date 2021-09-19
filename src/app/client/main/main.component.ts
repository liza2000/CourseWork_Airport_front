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
  // public flight1: Flight = new Flight();
  public allflights: Array<Flight> = new Array<Flight>();
  public puncts: string[] = [];

  public bookMode = false;
  ngOnInit() {
    this.flightService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)));
     this.allflights.push(this.flight);
    // this.allflights.push(this.flight1);
  }

  searchFlights(dep: string, arr: string, date: string, count: string) {
    this.allflights = new Array<Flight>();
  this.flightService.getFlights(dep, arr, new Date(date), Number(count))
  .subscribe((data: Response) => {
    const res = JSON.parse(JSON.stringify(data));
    for (let i in res ) {
      console.log(res[i]['arr']);
      let flight = new Flight(res[i]['id'], res[i]['dep'], res[i]['arr'],
        res[i]['deptime'],res[i]['arrtime'], res[i]['count'],res[i]['actualArrtime'],res[i]['actualDeptime'],res[i]['aircraft'],res[i]['status']);
      console.log(flight);
      this.allflights.push(flight);
    }
  } );
  console.log(this.allflights)
  this.bookMode = false;

  }
  public toBook(flight: Flight) {
    this.betweenComponentsService.sendFlight(flight.id);
    this.betweenComponentsService.sendCount(flight.count);
  }
  loadBook(id:string){
    this.betweenComponentsService.sendBookID(id);
  }
}
