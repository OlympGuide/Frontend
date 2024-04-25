import { defineStore } from 'pinia';
import { getSportFields, getSportFieldById } from '@/api/sportFieldApi.ts';
import { SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';

interface SportFieldState extends ApiState {
  sportFields: SportField[];
  selectedSportField: SportField | undefined;
}

export const useSportFieldStore = defineStore('sportField', {
  state: (): SportFieldState => {
    return {
      sportFields: [],
      selectedSportField: undefined,
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
    async loadSelectedSportField(id: string) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res: AxiosResponse<SportField, any> = await getSportFieldById(id);
        this.selectedSportField = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
