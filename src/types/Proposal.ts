import { SportFieldCategory } from '@/types/SportField.ts';
import { User } from '@/types/User.ts';

export interface SportFieldProposal {
  sportFieldName: string;
  sportFieldCategory: SportFieldCategory;
  sportFieldDescription: string;
  sportFieldLongitude: number;
  sportFieldLatitude: number;
  sportFieldAddress?: string;
  id?: string;
  user?: User;
  //sportFieldFile?: File; //TODO add again after backend accepts files
}

export type PostSportFieldProposal = Omit<SportFieldProposal, 'id'>;

export enum SportFieldProposalState {
  Open,
  Approved,
  Denied,
}
