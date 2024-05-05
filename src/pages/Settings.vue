<template>
  <div class="page-container-placement">
    <p class="page-title">Einstellungen</p>
    <div class="mt-5 flex items-center space-x-4">
      
      <div class="button-layout flex flex-col space-y-2">
        <ToggleButton
          v-model="isDemoActive"
          class="w-48"
          onLabel="Demo Mode: On"
          offLabel="Demo Mode: Off" />
        <Button
          @click="testDataButtonClicked"
          class="w-48 !bg-primaryRed">
          Testdaten (Neu)erstellen
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createOrRecreateTestData } from '@/api/testDataApi'

import { useDemoStore } from '@/stores/DemoStore.ts';
import { storeToRefs } from 'pinia';

const demoStore = useDemoStore();
const { isDemoActive } = storeToRefs(demoStore);

const testDataButtonClicked = () => {
  createOrRecreateTestData();
};

</script>

<style scoped></style>
