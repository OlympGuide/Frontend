import { defineStore } from 'pinia';
import { postSportFieldProposal, getSportFieldProposals, changeStateById } from '@/api/sportFieldProposalApi.ts';
import { PostSportFieldProposal, SportFieldProposal, SportFieldProposalState } from '@/types/Proposal';
import { AxiosResponse } from 'axios';

interface SportFieldState {
  sportFieldProposals: SportFieldProposal[];
  isLoading: boolean;
  errorMessage: string;
}

export const useSportFieldProposalStore = defineStore('sportFieldProposal', {
  state: (): SportFieldState => {
    return {
      sportFieldProposals: [],
      isLoading: false,
      errorMessage: '',
    };
  },
  actions: {
    async loadSportFieldProposals() {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res: AxiosResponse<SportFieldProposal[], any> = await getSportFieldProposals();
        this.sportFieldProposals = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field proposal: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async setSportFieldProposalState(id: string, state: SportFieldProposalState) {
      try {
        this.errorMessage = '';
        const res: AxiosResponse<SportFieldProposal[], any> = await changeStateById(id, state);
        this.sportFieldProposals = res.data;
      } catch (e: any) {
        console.error('Error while updating sport field proposal: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async createSportFieldProposal(sportField: PostSportFieldProposal) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await postSportFieldProposal(sportField);
      } catch (e: any) {
        console.error('Error while creating new sport field: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
