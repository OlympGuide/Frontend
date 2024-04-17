export interface SportFieldProposal {
  sportFieldName: string,
  sportFieldDescription: string,
  sportFieldLongitude: number ,
  sportFieldLatitude: number,
  sportFieldAddress: string 
}

export type PostSportFieldProposal = Omit<SportFieldProposal, 'id'>;

export enum SportFieldProposalState {
  Open,
  Approved,
  Denied
};
