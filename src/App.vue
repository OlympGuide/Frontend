<template>
  <HelloWorld v-if="userStore.user" :msg="`${user.firstName} ${user.lastName}`" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserStore } from '@/stores/UserStore';
import { User } from '@/types/User';

const userStore = useUserStore();

const user: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@abc.ch',
}

userStore.setUser(user);
</script>

<style scoped>
</style>
