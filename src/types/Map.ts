import { Reservation } from '@/types/Reservation.ts';

export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  file?: File;
  reservations?: Reservation[];
}

export type PostSportField = Omit<SportField, 'id'>;
