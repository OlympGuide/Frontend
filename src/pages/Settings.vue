<template>
  <div class="page-container-placement">
    <p class="page-title">Einstellungen</p>
    <div class="mt-5 flex items-center space-x-4">
      <p class="text-lg font-medium">Demo Mode</p>
      <ToggleButton
        v-model="isDemoActive"
        class="w-24"
        onLabel="On"
        offLabel="Off"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDemoStore } from '@/stores/DemoStore.ts';
import { storeToRefs } from 'pinia';

const demoStore = useDemoStore();
const { isDemoActive } = storeToRefs(demoStore);
</script>

<style scoped></style>
