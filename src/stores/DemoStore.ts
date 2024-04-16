import { reactive, readonly } from 'vue';

export interface State {
  demoMode: boolean;
}

export interface Methods {
  toggleDemoMode: () => void;
}

const state: State = reactive({
  demoMode: false,
});

const methods: Methods = {
  toggleDemoMode() {
    state.demoMode = !state.demoMode;
  },
};

export function useDemoStore() {
  return { state: readonly(state), methods };
}
