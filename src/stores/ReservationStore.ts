import { defineStore } from 'pinia';
import { ApiState } from '@/types/ApiState.ts';
import {
  deleteReservation,
  getReservationsByUser,
  postReservation,
} from '@/api/reservationApi.ts';
import { PostReservation, Reservation } from '@/types/Reservation.ts';
import { AxiosResponse } from 'axios';
import { setHours } from 'date-fns';
import { useUserStore } from '@/stores/UserStore.ts';
import { instanceOfUser, User } from '@/types/User.ts';

interface ReservationState extends ApiState {
  myReservations: Reservation[];
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => {
    return {
      // TODO: remove dummy data
      myReservations: [
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
      ],
      isLoading: false,
      errorMessage: '',
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
