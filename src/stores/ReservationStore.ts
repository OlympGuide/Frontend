import { defineStore } from 'pinia';
import { ApiState } from '@/types/ApiState.ts';
import {
  deleteReservation,
  getReservationsByUser,
  postReservation,
  updateReservation,
} from '@/api/reservationApi.ts';
import {
  PostReservation,
  Reservation,
  UpdateReservation,
} from '@/types/Reservation.ts';
import { AxiosResponse } from 'axios';
import { useUserStore } from '@/stores/UserStore.ts';
import { instanceOfUser, User } from '@/types/User.ts';

interface ReservationState extends ApiState {
  myReservations: Reservation[];
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => {
    return {
      myReservations: [],
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  actions: {
    async loadMyReservations() {
      const userStore = useUserStore();
      if (!userStore.user) return; // TODO: Error handling
      if (!instanceOfUser(userStore.user)) {
        await userStore.getLoggedInUser();
      }

      const user: User = userStore.user as User;

      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res: AxiosResponse<Reservation[]> = await getReservationsByUser(
          user.id
        );
        this.myReservations = res.data;
      } catch (e: any) {
        console.error('Error while loading my reservations: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
    async createReservation(
      reservation: PostReservation
    ): Promise<Reservation | undefined> {
      let newReservation: Reservation | undefined = undefined;
      this.isLoading = true;
      try {
        this.errorMessage = '';
        const res = await postReservation(reservation);
        newReservation = res.data;
        this.successMessage = 'Ihre Reservation wurde erstellt.';
      } catch (e: any) {
        console.error(
          'Error while creating a new sport field reservation: ',
          e
        );
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }

      return newReservation;
    },
    async updateReservation(reservation: UpdateReservation) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await updateReservation(reservation);
        this.successMessage = 'Ihre Reservation wurde aktualisiert.';
      } catch (e: any) {
        console.error('Error while updating a reservation: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async removeReservation(id: string) {
      this.isLoading = true;
      try {
        this.errorMessage = '';
        await deleteReservation(id);
        this.successMessage = 'Ihre Reservation wurde gelöscht.';
      } catch (e: any) {
        console.error('Error while deleting a reservation: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
