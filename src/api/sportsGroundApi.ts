import { apiClient } from "@/api/axiosConfig.ts";

export const postSportsGroundData = (data: any) => {
  return apiClient.post("/sportsGround", data); //TODO to be changed
};
