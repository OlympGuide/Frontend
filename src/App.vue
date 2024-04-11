<template>
  <component :is="$route.meta.layout">
    <RouterView />
  </component>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { pinia } from '@/main.ts';
import { instanceOfApiState } from '@/types/ApiState.ts';

import { useToast } from 'primevue/usetoast';
import { ToastMessageOptions } from 'primevue/toast';
const toast = useToast();

watch(
  pinia.state,
  (state: any) => {
    Object.values(state).forEach((item: any) => {
      if (instanceOfApiState(item) && item.errorMessage) {
        const toastMessage: ToastMessageOptions = {
          severity: 'error',
          summary: 'Something went wrong',
          detail: item.errorMessage,
          life: 3000,
        };

        toast.add(toastMessage);
      }
    });
  },
  { deep: true }
);
</script>
