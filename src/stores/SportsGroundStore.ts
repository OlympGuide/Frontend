import { defineStore } from "pinia";
import { CreateSportFieldRequest } from "@/types/CreateSportFieldRequest.ts";
import { postSportsGroundData } from "@/api/sportsGroundApi.ts";

interface SportsGroundState {
  isLoading: boolean;
  errorMessage: string;
}

export const useSportsGroundStore = defineStore("sportsGround", {
  state: (): SportsGroundState => {
    return {
      isLoading: false,
      errorMessage: "",
    };
  },
  actions: {
    async createNewSportsFieldRequest(
      sportFieldRequest: CreateSportFieldRequest,
    ) {
      this.isLoading = true;
      try {
        this.errorMessage = "";
        await postSportsGroundData(sportFieldRequest);
      } catch (e: any) {
        console.log("Error while creating new sports ground: ", e);
        this.errorMessage = "Es gab ein Problem beim Übermitteln der Daten";
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
