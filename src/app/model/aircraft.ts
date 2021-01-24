export class Aircraft {
   company: string;
  id: string;
  location: string;
  aircraftmodel: string;

  constructor(company: string, id: string, location: string, aircraftmodel: string) {
    this.company = company;
    this.id = id;
    this.location = location;
    this.aircraftmodel = aircraftmodel;
  }
}
