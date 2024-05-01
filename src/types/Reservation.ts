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
  sportFieldId: string;
  start: Date;
  end: Date;
}

export interface UpdateReservation {
  id: string;
  start: Date;
  end: Date;
}
