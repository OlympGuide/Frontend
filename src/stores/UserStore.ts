import { defineStore } from "pinia";
import { User } from "@/types/User.ts";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as User | null,
        };
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
    },
});