import { apiClient } from '@/api/axiosConfig.ts';
import { PostSportFieldProposal, SportFieldProposal, SportFieldProposalState } from '@/types/Proposal';
import { AxiosResponse } from 'axios';

const PROPOSAL_PATH = '/sportfieldproposal/';

export const postSportFieldProposal = (data: PostSportFieldProposal) => {
  return apiClient.post(PROPOSAL_PATH, data);
};

export const getSportFieldProposals = (): Promise<AxiosResponse<SportFieldProposal[], any>> => {
  return apiClient.get<SportFieldProposal[]>(PROPOSAL_PATH);
};

export const changeStateById = (id: string, state: SportFieldProposalState) => {
  return apiClient.put(`${PROPOSAL_PATH}${id}`, { state });
};
