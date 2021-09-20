import { Component, OnInit } from '@angular/core';
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
  public allflights: Array<Flight> = new Array<Flight>();
  public puncts: string[] = [];
  public selectedFlight: Flight;

  ngOnInit() {
    this.flightService.getPuncts().subscribe(data => (data as string[]).forEach( p => this.puncts.push(p)));
  }

  searchFlights(dep: string, arr: string, date: string, count: string) {
    this.allflights = new Array<Flight>();
  this.flightService.getFlights(dep, arr, new Date(date), Number(count))
  .subscribe((data: Response) => {
    const res = JSON.parse(JSON.stringify(data));
    for (let i in res ) {
      let flight = Flight.init(res[i]);
      this.allflights.push(flight);
    }
  } );
  this.selectedFlight = null;
  }
  loadBook(id:string){
    this.betweenComponentsService.sendBookID(id);
  }
}
