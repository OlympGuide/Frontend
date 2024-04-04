import { apiClient } from '@/api/axiosConfig.ts';
import { PostSportField, SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/sportfields/';

export const postSportField = (data: PostSportField) => {
  return apiClient.post(SPORT_FIELD_PATH, data);
};

export const getSportFields = (): Promise<AxiosResponse<SportField[], any>> => {
  return apiClient.get<SportField[]>(SPORT_FIELD_PATH);
};
