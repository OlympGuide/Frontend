import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { PostSportField, SportField } from '@/types/Map.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/SportField';

export const postSportField = async (data: PostSportField) => {
  const api = await getApiClientInstance();
  return api.post(SPORT_FIELD_PATH, data);
};

export const getSportFields = async (): Promise<
  AxiosResponse<SportField[], any>
> => {
  const api = await getApiClientInstance();
  return api.get<SportField[]>(SPORT_FIELD_PATH);
};
