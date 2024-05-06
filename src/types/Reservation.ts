import { SportField } from '@/types/SportField.ts';
import { User } from '@/types/User.ts';

export enum ReservationType {
  ME = 'me',
  OTHERS = 'others',
}

export interface Reservation {
  id: string;
  sportField?: SportField;
  user: User;
  start: Date;
  end: Date;
}

export interface PostReservation {
  sportFieldId: string;
  start: Date;
  end: Date;
}

export interface UpdateReservation {
  id: string;
  start: Date;
  end: Date;
}
