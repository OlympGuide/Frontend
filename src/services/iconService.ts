import {
  sportFieldCategories,
  SportFieldCategory,
} from '@/types/SportField.ts';
import markerIconUrl from '@/assets/icons/marker.png';
import L, { DivIcon, Icon } from 'leaflet';

export interface IconKeyMap {
  [key: string]: Icon | DivIcon;
}

export interface IconObject {
  key: string;
  name?: string;
  category?: SportFieldCategory;
  url: string;
  filterIconUrl?: string;
  isFilterable: boolean;
}

export const iconObjects: IconObject[] = [
  ...sportFieldCategories,
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
      popupAnchor: [0, -35],
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
