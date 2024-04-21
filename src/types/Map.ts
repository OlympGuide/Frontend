export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  file?: File;
}

export type ShowSportField = Omit<SportField, 'file'>;
