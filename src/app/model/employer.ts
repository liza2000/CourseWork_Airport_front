import {PersonalData} from './personal-data';

export class Employer {
  personalData: PersonalData;
  company: string;
  position: string;


  constructor(personalData: PersonalData, company: string, position: string) {
    this.personalData = personalData;
    this.company = company;
    this.position = position;
  }
}
