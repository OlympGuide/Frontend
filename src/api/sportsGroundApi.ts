import { apiClient } from "@/api/axiosConfig.ts";

export const postSportsGroundData = (data: CreateSportFieldRequestDTO) => {
  return apiClient.post("/controller/AddSportField", data);
};
