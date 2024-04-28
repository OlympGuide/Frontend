import { defineStore } from 'pinia';

interface DemoState {
  isDemoActive: boolean;
}

export const useDemoStore = defineStore('demo', {
  state: (): DemoState => {
    return {
      isDemoActive: false,
    };
  },
});
