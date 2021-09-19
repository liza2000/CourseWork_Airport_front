import {PersonalData} from './personal-data';

export class Passenger {

   waitingRoom = 'middle';

   birthday: Date;
    seat: string;
   max_weight = 0;
   total_weight: number;
   status = 'accept';
   personalData: PersonalData = {pathronymic: '', passport: '', surname: '', name:''};

  constructor(
  ) {}
}
