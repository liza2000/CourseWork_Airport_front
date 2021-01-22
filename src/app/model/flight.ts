export class Flight {
  public aircraft: string;
  public actualDeptime: Date;
  public actualArrtime: Date;
  public status;
  public id: number;
  public dep: string;
  public arr: string;
  public deptime: Date;
  public arrtime: Date;
  public count: number;
  constructor(id: string, dep: string, arr: string, deptime: string, arrtime: string, count: string) {
    this.id = Number(id);
    this.dep = dep;
    this.arr = arr;
    this.deptime = new Date(deptime);
    this.arrtime = new Date(arrtime);
    this.count = Number(count);
  }
}
