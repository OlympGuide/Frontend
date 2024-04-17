export interface SportField {
  id: string;
  SportFieldName: string;
  SportFieldDescription?: string;
  SportFieldLatitude: number;
  SportFieldLongitude: number;
  SportFieldAddress?: string;
  file?: File;
}

export type PostSportField = Omit<SportField, 'id'>;

export type ShowSportField = Omit<SportField, 'file'>;
