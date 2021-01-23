export class WorkAtTime {
   flight: number;
  gate: number;
  start: Date;
   finish: Date;

  constructor(flight: string, gate: string, start: string, finish: string) {
    this.flight = Number(flight);
    this.gate = Number(gate);
    this.start = new Date(start);
    this.finish = new Date(finish);
  }
}
