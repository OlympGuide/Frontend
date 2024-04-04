export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
}

export type PostSportField = Omit<SportField, 'id'>;
