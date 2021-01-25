import {Passenger} from './passenger';
import {Flight} from './flight';

export class Book {
  public id: number;
  amount: number;
  passengers: Passenger[] = [];
  contact: string;
  arrTime: Date;
  depTime: Date;
  depAirport: string;
  arrAirport: string;
  constructor(){
  }
}
