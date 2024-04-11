import { defineStore } from 'pinia';
import { EmailPassword, User } from '@/types/User.ts';
import { login } from '@/api/userApi.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';

interface UserState extends ApiState {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
      isLoading: false,
      errorMessage: '',
    };
  },
  actions: {
    async login(credentials: EmailPassword) {
      this.isLoading = true;

      try {
        this.errorMessage = '';
        const res: AxiosResponse<User, any> = await login(credentials);
        this.user = res.data;
      } catch (e: any) {
        console.error('Error while logging in: ', e);
        this.errorMessage = 'Es gab ein Problem beim Übermitteln der Daten';
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
