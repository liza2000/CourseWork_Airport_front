export class PersonalData {
  passport: string;
  name: string;
  surname: string;
  pathronymic: string;

  constructor(passport: string, name: string, surname: string, pathronymic: string) {
    this.passport = passport;
    this.name = name;
    this.surname = surname;
    this.pathronymic = pathronymic;
  }
}
