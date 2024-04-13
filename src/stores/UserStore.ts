import { defineStore } from 'pinia';
import { me } from '@/api/userApi.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';
import { User } from '@/types/User.ts';

interface UserState extends ApiState {
  isAuthenticated: boolean;
  user: User | null;
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
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getFullName(): string {
      if (this.user) {
        return `${this.user.firstName} ${this.user.lastName}`;
      }

      return '';
    },
  },
});
