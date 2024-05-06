import { Reservation } from '@/types/Reservation.ts';

export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  category: SportFieldCategory;
  address?: string;
  file?: File;
  reservations?: Reservation[];
}

export enum SportFieldCategory {
  Football,
  Basketball,
  Volleyball,
  Swimming,
  Tennis,
  Miscellaneous,
}
