export class Aircraft {
   company: string;
  id: number;
  location: string;
  aircraftmodel: string;

  constructor(company: string, id: string, location: string, aircraftmodel: string) {
    this.company = company;
    this.id = Number(id);
    this.location = location;
    this.aircraftmodel = aircraftmodel;
  }
}
