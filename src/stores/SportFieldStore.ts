import { defineStore } from 'pinia';
import { getSportFields } from '@/api/sportFieldApi.ts';
import { SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';

interface SportFieldState {
  sportFields: SportField[];
  isLoading: boolean;
  errorMessage: string;
}

export const useSportFieldStore = defineStore('sportField', {
  state: (): SportFieldState => {
    return {
      sportFields: [],
      isLoading: false,
      errorMessage: '',
    };
  },
  actions: {
    async loadSportFields() {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res: AxiosResponse<SportField[], any> = await getSportFields();
        this.sportFields = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
