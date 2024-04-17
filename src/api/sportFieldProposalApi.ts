import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { PostSportFieldProposal, SportFieldProposal, SportFieldProposalState } from '@/types/Proposal';
import { AxiosResponse } from 'axios';

const PROPOSAL_PATH = '/sportfieldproposals/';

export const postSportFieldProposal = async (data: PostSportFieldProposal) => {
  const api = await getApiClientInstance();
  return api.post(PROPOSAL_PATH, data);
};

export const getSportFieldProposals = async (): Promise<AxiosResponse<SportFieldProposal[], any>> => {
  const api = await getApiClientInstance();
  return api.get<SportFieldProposal[]>(PROPOSAL_PATH, {
    params: {
      state: SportFieldProposalState.Open,
    },
  });
};

export const changeStateById = async (id: string, state: SportFieldProposalState) => {
  const api = await getApiClientInstance();
  return api.put(`${PROPOSAL_PATH}${id}`, state, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
