import { apiClient } from '@/api/axiosConfig.ts';
import { User } from '@/types/User.ts';
import { AxiosResponse } from 'axios';

const ME_PATH: string = 'users/me';

export const me = async (): Promise<AxiosResponse<User, any>> => {
  const api = await apiClient();
  return api.get(ME_PATH);
};