import { SportFieldCategory } from '@/types/SportField.ts';
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
import markerIconUrl from '@/assets/icons/marker.png';
import L, { DivIcon, Icon } from 'leaflet';

export interface IconKeyMap {
  [key: string]: Icon | DivIcon;
}

export interface IconObject {
  key: string;
  name?: string;
  category: SportFieldCategory;
  url: string;
  filterIconUrl?: string;
  isFilterable: boolean;
}

export const iconObjects: IconObject[] = [
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
  {
    key: 'marker',
    category: SportFieldCategory.Miscellaneous,
    url: markerIconUrl,
    isFilterable: false,
  },
];

export const createIcons = (): IconKeyMap => {
  const iconKeyMap: IconKeyMap = {};

  iconObjects.forEach(({ key, url }) => {
    iconKeyMap[key] = L.icon({
      iconUrl: url,
      iconSize: [35, 35],
      iconAnchor: [17.5, 35],
      popupAnchor: [0, -15],
    });
  });

  iconKeyMap['stackedIcon'] = L.divIcon({
    html: '<span>1</span>',
  });

  return iconKeyMap;
};

export const getIconKey = (
  category: SportFieldCategory
): string | undefined => {
  const iconObject = iconObjects.find(
    (iconObject) => iconObject.category === category
  );
  return iconObject ? iconObject.key : undefined;
};
