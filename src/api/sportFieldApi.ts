import { ShowSportField } from '@/types/Map.ts';
import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/SportField';

export const getSportFields = async (): Promise<
  AxiosResponse<ShowSportField[], any>
> => {
  const api = await getApiClientInstance();
  return api.get<ShowSportField[]>(SPORT_FIELD_PATH);
};
