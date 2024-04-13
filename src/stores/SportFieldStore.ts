import { defineStore } from 'pinia';
import { getSportFields, postSportField } from '@/api/sportFieldApi.ts';
import { PostSportField, SportField } from '@/types/Map.ts';
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
    async createSportField(sportField: PostSportField) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await postSportField(sportField);
      } catch (e: any) {
        console.error('Error while creating new sport field: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
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
