export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
}

export type PostSportField = Omit<SportField, 'id'>;
