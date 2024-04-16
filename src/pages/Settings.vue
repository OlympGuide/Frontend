<template>
  <div class="page-container-placement">
    <p class="page-title">Einstellungen</p>
    <div class="mt-5 flex items-center space-x-4">
      <p class="text-lg font-medium">Demo Mode</p>
      <ToggleButton
        v-model="demoMode"
        class="w-24"
        onLabel="On"
        offLabel="Off"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Methods, State } from '@/stores/DemoStore';

const demoStore = inject<{ state: State; methods: Methods }>('demoStore');
if (!demoStore) {
  throw new Error('demoStore is not provided');
}

const { state, methods } = demoStore;

// Sync the ToggleButton with the demoMode state
const demoMode = computed({
  get: () => state.demoMode,
  set: (value) => {
    if (state.demoMode !== value) {
      methods.toggleDemoMode();
    }
  },
});
</script>

<style scoped></style>
