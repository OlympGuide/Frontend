import { SportField } from '@/types/Map.ts';
import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/sportfields';

export const getSportFields = async (): Promise<
  AxiosResponse<SportField[], any>
> => {
  const api = await getApiClientInstance();
  return api.get<SportField[]>(SPORT_FIELD_PATH);
};

export const getSportFieldById = async (
  id: string
): Promise<AxiosResponse<SportField>> => {
  const api = await getApiClientInstance();
  return api.get<SportField>(`${SPORT_FIELD_PATH}/${id}`);
};
