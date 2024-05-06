import { SportFieldCategory } from '@/types/SportField.ts';
import footballIconUrl from '@/assets/icons/football.png';
import volleyballIconUrl from '@/assets/icons/volleyball.png';
import basketballIconUrl from '@/assets/icons/basketball.png';
import swimmingIconUrl from '@/assets/icons/swimming.png';
import miscellaneousIconUrl from '@/assets/icons/miscellaneous.png';

export interface IconObject {
  name: string;
  category: SportFieldCategory;
  url: string;
}

export const iconObjects: IconObject[] = [
  {
    name: 'football',
    category: SportFieldCategory.Football,
    url: footballIconUrl,
  },
  {
    name: 'volleyball',
    category: SportFieldCategory.Volleyball,
    url: volleyballIconUrl,
  },
  {
    name: 'basketball',
    category: SportFieldCategory.Basketball,
    url: basketballIconUrl,
  },
  {
    name: 'swimming',
    category: SportFieldCategory.Swimming,
    url: swimmingIconUrl,
  },
  {
    name: 'miscellaneous',
    category: SportFieldCategory.Miscellaneous,
    url: miscellaneousIconUrl,
  },
];

export const getIconName = (
  category: SportFieldCategory
): string | undefined => {
  const iconObject = iconObjects.find(
    (iconObject) => iconObject.category === category
  );
  return iconObject ? iconObject.name : undefined;
};
