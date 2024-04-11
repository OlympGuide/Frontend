import { apiClient } from '@/api/axiosConfig.ts';
import { EmailPassword, RegisterType, User } from '@/types/User.ts';
import { AxiosResponse } from 'axios';

const LOGIN_PATH: string = '/login';
const REGISTER_PATH: string = '/register';

export const login = (
  data: EmailPassword
): Promise<AxiosResponse<User, any>> => {
  return apiClient.post(LOGIN_PATH, data);
};

export const register = (data: RegisterType) => {
  return apiClient.post(REGISTER_PATH, data);
};
