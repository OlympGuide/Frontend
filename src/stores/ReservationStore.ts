import { defineStore } from 'pinia';
import { ApiState } from '@/types/ApiState.ts';
import { deleteReservation, postReservation } from '@/api/reservationApi.ts';
import { PostReservation, Reservation } from '@/types/Reservation.ts';

interface ReservationState extends ApiState {
  myReservations: Reservation[];
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => {
    return {
      myReservations: [],
      isLoading: false,
      errorMessage: '',
    };
  },
  actions: {
    async createReservation(reservation: PostReservation) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await postReservation(reservation);
      } catch (e: any) {
        console.error(
          'Error while creating a new sport field reservation: ',
          e
        );
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
    async removeReservation(id: string) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await deleteReservation(id);
      } catch (e: any) {
        console.error('Error while deleting a reservation: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
