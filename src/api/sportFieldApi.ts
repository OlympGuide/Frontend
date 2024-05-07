import { SportField, SportFieldCategory } from '@/types/SportField.ts';
import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const SPORT_FIELD_PATH = '/sportfields';

export const getSportFields = async (
  categoryFilter: SportFieldCategory | undefined
): Promise<AxiosResponse<SportField[], any>> => {
  const api = await getApiClientInstance();
  const params: { category: SportFieldCategory | undefined } = {
    category: undefined,
  };

  if (categoryFilter !== undefined) {
    params.category = categoryFilter;
  }

  return api.get<SportField[]>(SPORT_FIELD_PATH, {
    params,
  });
};

export const getSportFieldById = async (
  id: string
): Promise<AxiosResponse<SportField>> => {
  const api = await getApiClientInstance();
  return api.get<SportField>(`${SPORT_FIELD_PATH}/${id}`);
};
