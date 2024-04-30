import { defineStore } from 'pinia';
import { getSportFields, getSportFieldById } from '@/api/sportFieldApi.ts';
import { SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';
import { setHours } from 'date-fns';

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
    async loadReservationsBySportField(id: string) {
      this.isLoading = true;
      if (!this.selectedSportField) {
        await this.loadSelectedSportField(id);
      }

      try {
        this.errorMessage = '';
        // TODO: Implement API call to get reservations by sport field when ready
        // const res: AxiosResponse<Reservation[], any> =
        //   await getReservationsBySportField(id);

        this.selectedSportField!.reservations = [
          {
            id: 'blabla1',
            user: {
              id: 'ce36bae6-916f-4374-ac0a-3248a407a2af',
              name: 'Dario Aubry',
              displayName: 'Dario Aubry',
              roles: [0],
            },
            start: setHours(new Date(), 12),
            end: setHours(new Date(), 13),
          },
          {
            id: 'blabla2',
            user: {
              id: 'aaaaaaa-dfc8-4c95-acd1-f80c7d42541b',
              name: 'Max Mustermann',
              displayName: 'Max Mustermann',
              roles: [0],
            },
            start: setHours(new Date(), 14),
            end: setHours(new Date(), 15),
          },
        ];

        // this.selectedSportField!.reservations = res.data;
      } catch (e: any) {
        console.error('Error while loading sport field reservations: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
