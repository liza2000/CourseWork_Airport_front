export class PersonalData {
  passport: string;
  name: string;
  lastName: string;
  middleName: string;

  constructor(passport: string, name: string, surname: string, pathronymic: string) {
    this.passport = passport;
    this.name = name;
    this.lastName = surname;
    this.middleName = pathronymic;
  }
}
