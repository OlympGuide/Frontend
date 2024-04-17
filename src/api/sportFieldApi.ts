import { apiClient } from '@/api/axiosConfig.ts';
import { PostSportField, SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/sportfields/';

export const postSportField = async (data: PostSportField) => {
  const api = await apiClient();
  return api.post(SPORT_FIELD_PATH, data);
};

export const getSportFields = async (): Promise<
  AxiosResponse<SportField[], any>
> => {
  const api = await apiClient();
  return api.get<SportField[]>(SPORT_FIELD_PATH);
};
