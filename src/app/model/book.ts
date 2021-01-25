import {Passenger} from './passenger';
import {Flight} from './flight';

export class Book {
  public id: number;
  amount: number;
  time: Date;
  passengers: Passenger[] = [];
  contact: string;
  flight: Flight;
  count = 3;
  constructor(){
  }
}
