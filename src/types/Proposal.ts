export interface SportFieldProposal {
  id: string;
  date: string;
  userId: string;
  sport_field_name: string;
  sport_field_description: string;
  sport_field_longitude: number;
  sport_field_latitude: number;
  state: string;
}

export type PostSportFieldProposal = Omit<SportFieldProposal, 'id'>;

export enum SportFieldProposalState {
  Open,
  Approved,
  Denied
};
