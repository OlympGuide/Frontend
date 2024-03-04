<template>
  <h1>{{ msg }}</h1>

  <div class="m-5">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<style scoped>
</style>
