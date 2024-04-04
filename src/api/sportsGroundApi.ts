import { apiClient } from '@/api/axiosConfig.ts';
import { CreateSportFieldRequest } from '@/types/CreateSportFieldRequest.ts';

export const postSportsGroundData = (data: CreateSportFieldRequest) => {
  return apiClient.post("/SportField/", data);
};
