<template>
  <component :is="$route.meta.layout">
    <RouterView />
  </component>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { getActivePinia, Store } from 'pinia';

import { useToast } from 'primevue/usetoast';
import { ToastMessageOptions } from 'primevue/toast';
import { useUserStore } from '@/stores/UserStore.ts';
import { useAuth0 } from '@auth0/auth0-vue';
import { Auth0User } from '@/types/User.ts';
import { instanceOfApiState } from '@/types/ApiState.ts';

const toast = useToast();
const userStore = useUserStore();
const { user, isAuthenticated } = useAuth0();
const pinia: any = getActivePinia() as any;

pinia?._s.forEach((store: Store) => {
  if (instanceOfApiState(store)) {
    watch(
      () => store.errorMessage,
      () => {
        if (userStore.errorMessage) {
          const toastMessage: ToastMessageOptions = {
            severity: 'error',
            summary: 'Something went wrong!',
            detail: userStore.errorMessage,
            life: 3000,
          };

          toast.add(toastMessage);
        }
      }
    );
  }
});

onMounted(async () => {
  await userStore.getLoggedInUser();

  if (
    isAuthenticated.value &&
    user.value &&
    user.value.name &&
    user.value.nickname
  ) {
    const auth0User: Auth0User = {
      name: user.value.name,
      displayName: user.value.nickname,
      email: user.value.email,
      picture: user.value.picture,
    };

    userStore.$patch({ user: auth0User });
  }
});
</script>
