<template>
  <div class="icon-wrapper">
    <img
      :class="item.iconClasses"
      :src="getImageUrl(item.icon)"
      :alt="item.text"
    />
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
