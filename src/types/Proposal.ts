export interface SportFieldProposal {
  sportFieldName: string;
  sportFieldDescription: string;
  sportFieldLongitude: number;
  sportFieldLatitude: number;
  sportFieldAddress?: string;
  //sportFieldFile?: File; //TODO add again after backend accepts files
}

export interface SportField {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  address: string;
}

export type PostSportFieldProposal = Omit<SportFieldProposal, 'id'>;

export enum SportFieldProposalState {
  Open,
  Approved,
  Denied,
}
