import { getApiClientInstance } from '@/api/axiosConfig.ts';
import { AxiosResponse } from 'axios';

const TEST_DATA_PATH: string = 'TestDatas';

export const createOrRecreateTestData = async (): Promise<AxiosResponse<number, any>> => {
  const api = await getApiClientInstance();
  return api.post(TEST_DATA_PATH);
};
