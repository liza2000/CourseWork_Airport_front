export class Employer {
  passport: number;
  name: string;
  surname: string;
  pathronymic: string;
  company: string;
  position: string;


  constructor(passport: string, name: string, surname: string, pathronymic: string, company: string, position: string) {
    this.passport = Number(passport);
    this.name = name;
    this.surname = surname;
    this.pathronymic = pathronymic;
    this.company = company;
    this.position = position;
  }
}
