<template>
  <component :is="$route.meta.layout">
    <RouterView />
  </component>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { pinia } from '@/main.ts';
import { instanceOfApiState } from '@/types/ApiState.ts';

import { useToast } from 'primevue/usetoast';
import { ToastMessageOptions } from 'primevue/toast';
import { useUserStore } from '@/stores/UserStore.ts';
import { useAuth0 } from '@auth0/auth0-vue';
import { Auth0User } from '@/types/User.ts';

const toast = useToast();
const userStore = useUserStore();
const { user, isAuthenticated } = useAuth0();

onMounted(async () => {
  await userStore.getLoggedInUser();

  if (
    isAuthenticated.value &&
    user.value &&
    user.value.given_name &&
    user.value.family_name &&
    user.value.email &&
    user.value.picture
  ) {
    const auth0User: Auth0User = {
      firstName: user.value.given_name,
      lastName: user.value.family_name,
      email: user.value.email,
      picture: user.value.picture,
    };
    userStore.user = auth0User;
  }
});

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
