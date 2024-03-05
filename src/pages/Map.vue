<template>
    <HelloWorld v-if="user" :msg="`${user.firstName} ${user.lastName}`" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
const user = userStore.user;
</script>

<style scoped>
</style>