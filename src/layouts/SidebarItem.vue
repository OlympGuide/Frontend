<template>
  <div class="icon-wrapper">
    <img
      v-if="item.iconImg"
      :class="item.iconClasses"
      :src="getImageUrl(item.iconImg)"
      :alt="item.text"
    />
    <i v-if="item.icon" :class="item.icon" class="text-primaryRed text-3xl" />
  </div>
  <span class="text">{{ item.text }}</span>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/Menu.ts';

defineProps<{
  item: MenuItem;
}>();

const getImageUrl = (name: string): string => {
  return new URL(`../assets/icons/${name}`, import.meta.url).href;
};
</script>

<style scoped></style>
