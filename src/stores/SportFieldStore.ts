import { defineStore } from 'pinia';
import { getSportFields, getSportFieldById } from '@/api/sportFieldApi.ts';
import { SportField, SportFieldCategory } from '@/types/SportField.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';
import { Reservation } from '@/types/Reservation.ts';
import { getReservationsBySportField } from '@/api/reservationApi.ts';

interface SportFieldState extends ApiState {
  sportFields: SportField[];
  selectedSportField: SportField | undefined;
  categoryFilters: SportFieldCategory[];
}

export const useSportFieldStore = defineStore('sportField', {
  state: (): SportFieldState => {
    return {
      sportFields: [],
      selectedSportField: undefined,
      categoryFilters: [],
      isLoading: false,
      errorMessage: '',
      successMessage: '',
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
    async loadReservationsBySportField(id: string) {
      this.isLoading = true;
      if (!this.selectedSportField) {
        await this.loadSelectedSportField(id);
      }

      try {
        this.errorMessage = '';
        const res: AxiosResponse<Reservation[], any> =
          await getReservationsBySportField(id);

        this.selectedSportField!.reservations = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field reservations: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
    addOrRemoveCategoryFilter(category: SportFieldCategory) {
      if (this.categoryFilters.includes(category)) {
        this.categoryFilters = this.categoryFilters.filter(
          (filter) => filter !== category
        );
      } else {
        this.categoryFilters.push(category);
      }
    },
  },
});
