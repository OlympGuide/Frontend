import { defineStore } from 'pinia';
import { Auth0User, User } from '@/types/User.ts';
import { me } from '@/api/userApi.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';

interface UserState extends ApiState {
  isAuthenticated: boolean;
  user: User | Auth0User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      errorMessage: '',
    };
  },
  actions: {
    async getLoggedInUser() {
      this.isLoading = true;

      try {
        this.errorMessage = '';
        const res: AxiosResponse<User, any> = await me();
        this.user = res.data;
      } catch (e: any) {
        console.error('Error while fetching logged in user: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
