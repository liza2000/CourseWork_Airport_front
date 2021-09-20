import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Flight} from '../model/flight';
import {Employer} from '../model/employer';

@Injectable({
  providedIn: 'root'
})
export class BetweenComponentsService {
  private employer: Employer;
  private bookID: string;
  private countOfFlights;
  constructor() {}
  private countSource=new BehaviorSubject<number>(this.countOfFlights);
  private EmplSource = new BehaviorSubject<Employer>(this.employer);
  currentEmployer = this.EmplSource.asObservable();
  private bookIDSource = new BehaviorSubject<string>(this.bookID);
  currentBookID = this.bookIDSource.asObservable();
  sendEmployer(val: Employer) {
    this.EmplSource.next(val);
  }
  sendBookID(val: string) {
    this.bookIDSource.next((val));
  }
}
