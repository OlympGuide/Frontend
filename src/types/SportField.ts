import { Reservation } from '@/types/Reservation.ts';
import footballIconUrl from '@/assets/icons/football.png';
import footballPinIconUrl from '@/assets/icons/football_pin.png';
import volleyballIconUrl from '@/assets/icons/volleyball.png';
import volleyballPinIconUrl from '@/assets/icons/volleyball_pin.png';
import basketballIconUrl from '@/assets/icons/basketball.png';
import basketballPinIconUrl from '@/assets/icons/basketball_pin.png';
import swimmingIconUrl from '@/assets/icons/swimming.png';
import swimmingPinIconUrl from '@/assets/icons/swimming_pin.png';
import tennisIconUrl from '@/assets/icons/tennis.png';
import tennisPinIconUrl from '@/assets/icons/tennis_pin.png';
import miscellaneousIconUrl from '@/assets/icons/miscellaneous.png';
import miscellaneousPinIconUrl from '@/assets/icons/miscellaneous_pin.png';
import { IconObject } from '@/services/iconService.ts';

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

export const sportFieldCategories: IconObject[] = [
  {
    key: 'football',
    name: 'Fussball',
    category: SportFieldCategory.Football,
    url: footballPinIconUrl,
    filterIconUrl: footballIconUrl,
    isFilterable: true,
  },
  {
    key: 'volleyball',
    name: 'Volleyball',
    category: SportFieldCategory.Volleyball,
    url: volleyballPinIconUrl,
    filterIconUrl: volleyballIconUrl,
    isFilterable: true,
  },
  {
    key: 'basketball',
    name: 'Basketball',
    category: SportFieldCategory.Basketball,
    url: basketballPinIconUrl,
    filterIconUrl: basketballIconUrl,
    isFilterable: true,
  },
  {
    key: 'swimming',
    name: 'Schwimmen',
    category: SportFieldCategory.Swimming,
    url: swimmingPinIconUrl,
    filterIconUrl: swimmingIconUrl,
    isFilterable: true,
  },
  {
    key: 'tennis',
    name: 'Tennis',
    category: SportFieldCategory.Tennis,
    url: tennisPinIconUrl,
    filterIconUrl: tennisIconUrl,
    isFilterable: true,
  },
  {
    key: 'miscellaneous',
    name: 'Sonstiges',
    category: SportFieldCategory.Miscellaneous,
    url: miscellaneousPinIconUrl,
    filterIconUrl: miscellaneousIconUrl,
    isFilterable: true,
  },
];
