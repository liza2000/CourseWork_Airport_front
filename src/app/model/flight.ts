export class Flight {
  aircraft: string;
   actualDeptime: Date;
   actualArrtime: Date;
   status;
   id: number;
   dep: string;
   arr: string;
   deptime: Date;
   arrtime: Date;
   count: number;
  constructor(id: string, dep: string, arr: string, deptime: string, arrtime: string, count: string,
              actualArrtime: string, actualDeptime: string, aircraft: string,status: string) {
    this.id = Number(id);
    this.dep = dep;
    this.arr = arr;
    this.deptime = new Date(deptime);
    this.arrtime = new Date(arrtime);
    this.count = Number(count);
    this.actualArrtime = new Date(actualArrtime);
    this.actualDeptime = new Date(actualDeptime);
    this.aircraft = aircraft;
    this.status = status;
  }
}
