import { SportFieldCategory } from '@/types/SportField.ts';
import footballIconUrl from '@/assets/icons/football.png';
import volleyballIconUrl from '@/assets/icons/volleyball.png';
import basketballIconUrl from '@/assets/icons/basketball.png';
import swimmingIconUrl from '@/assets/icons/swimming.png';
import tennisIconUrl from '@/assets/icons/tennis.png';
import miscellaneousIconUrl from '@/assets/icons/miscellaneous.png';
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
  isFilterable: boolean;
}

export const iconObjects: IconObject[] = [
  {
    key: 'football',
    name: 'Fussball',
    category: SportFieldCategory.Football,
    url: footballIconUrl,
    isFilterable: true,
  },
  {
    key: 'volleyball',
    name: 'Volleyball',
    category: SportFieldCategory.Volleyball,
    url: volleyballIconUrl,
    isFilterable: true,
  },
  {
    key: 'basketball',
    name: 'Basketball',
    category: SportFieldCategory.Basketball,
    url: basketballIconUrl,
    isFilterable: true,
  },
  {
    key: 'swimming',
    name: 'Schwimmen',
    category: SportFieldCategory.Swimming,
    url: swimmingIconUrl,
    isFilterable: true,
  },
  {
    key: 'tennis',
    name: 'Tennis',
    category: SportFieldCategory.Tennis,
    url: tennisIconUrl,
    isFilterable: true,
  },
  {
    key: 'miscellaneous',
    name: 'Sonstiges',
    category: SportFieldCategory.Miscellaneous,
    url: miscellaneousIconUrl,
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
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -30],
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
