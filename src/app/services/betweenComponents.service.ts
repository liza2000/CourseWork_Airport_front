import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Flight} from '../model/flight';
import {Employer} from '../model/employer';

@Injectable({
  providedIn: 'root'
})
export class BetweenComponentsService {
  private flight: number;
  private isRegistration;
  private employer: Employer;
  private bookID: string;
  private countOfFlights;
  constructor() {}
  private flightSource = new BehaviorSubject<number>(this.flight);
  currentFlight = this.flightSource.asObservable();
  private countSource=new BehaviorSubject<number>(this.countOfFlights);
  currentCount = this.countSource.asObservable();
  private EmplFlagSource = new BehaviorSubject<boolean>(this.isRegistration);
  currentEmplFlag = this.EmplFlagSource.asObservable();
  private EmplSource = new BehaviorSubject<Employer>(this.employer);
  currentEmployer = this.EmplSource.asObservable();
  private bookIDSource = new BehaviorSubject<string>(this.bookID);
  currentBookID = this.bookIDSource.asObservable();
  sendFlight(flight: number) {
    this.flightSource.next(flight);
  }
  sendEmpl(val: boolean) {
    this.EmplFlagSource.next(val);
  }
  sendEmployer(val: Employer) {
    this.EmplSource.next(val);
  }
  sendBookID(val: string) {
    this.bookIDSource.next((val));
  }
  sendCount(val: number) {
    this.countSource.next(val);
  }
}
