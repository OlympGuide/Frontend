import { defineStore } from 'pinia';
import { me } from '@/api/userApi.ts';
import { AxiosResponse } from 'axios';
import { ApiState } from '@/types/ApiState.ts';
import { Auth0User, instanceOfUser, User, UserRole } from '@/types/User.ts';

interface UserState extends ApiState {
  user: User | Auth0User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      user: null,
      isLoading: false,
      errorMessage: '',
      successMessage: '',
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
    isOperator(): boolean {
      if (!instanceOfUser(this.user)) {
        return false;
      }

      return !!this.user.roles.find(
        (role: UserRole) => role === UserRole.Operator
      );
    },
    isAdministrator(): boolean {
      if (!instanceOfUser(this.user)) {
        return false;
      }

      return !!this.user.roles.find(
        (role: UserRole) => role === UserRole.Administrator
      );
    },
  },
});
