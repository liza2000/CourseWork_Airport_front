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
  constructor(id: string, dep: string, arr: string, deptime: string, arrtime: string, count: string) {
    this.id = Number(id);
    this.dep = dep;
    this.arr = arr;
    this.deptime = new Date(deptime);
    this.arrtime = new Date(arrtime);
    this.count = Number(count);
  }
}
