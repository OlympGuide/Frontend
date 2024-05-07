import { defineStore } from 'pinia';
import {
  postSportFieldProposal,
  getSportFieldProposals,
  changeStateById,
} from '@/api/sportFieldProposalApi.ts';
import {
  PostSportFieldProposal,
  SportFieldProposal,
  SportFieldProposalState,
} from '@/types/Proposal';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';

interface SportFieldState extends ApiState {
  sportFieldProposals: SportFieldProposal[];
}

export const useSportFieldProposalStore = defineStore('sportFieldProposal', {
  state: (): SportFieldState => {
    return {
      sportFieldProposals: [],
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  actions: {
    async loadSportFieldProposals() {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res: AxiosResponse<SportFieldProposal[], any> =
          await getSportFieldProposals();
        this.sportFieldProposals = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field proposal: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
    async setSportFieldProposalState(
      id: string,
      state: SportFieldProposalState
    ) {
      try {
        this.errorMessage = '';
        await changeStateById(id, state);
      } catch (e: any) {
        console.error('Error while updating sport field proposal: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
    async createSportFieldProposal(sportField: PostSportFieldProposal) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await postSportFieldProposal(sportField);
        this.successMessage = 'Proposal wurde erfolgreich eingereicht';
      } catch (e: any) {
        console.error('Error while creating new sport field: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
