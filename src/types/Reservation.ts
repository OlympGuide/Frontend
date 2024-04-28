import { SportField } from '@/types/Map.ts';
import { User } from '@/types/User.ts';

export interface Reservation {
  id: string;
  sportField?: SportField;
  user: User;
  start: Date;
  end: Date;
}

export interface PostReservation {
  sportField: string;
  start: Date;
  end: Date;
}
