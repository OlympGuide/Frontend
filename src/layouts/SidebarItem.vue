<template>
  <div class="icon-wrapper">
    <img
      v-if="item.iconImg"
      :class="item.iconClasses"
      :src="getImageUrl(item.iconImg)"
      :alt="item.text"
      @error="imageLoadError"
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
  if (name.startsWith('http')) {
    return name;
  }

  return new URL(`../assets/icons/${name}`, import.meta.url).href;
};

const imageLoadError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = new URL('../assets/icons/user.png', import.meta.url).href;
};
</script>

<style scoped></style>
