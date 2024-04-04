<template>
  <aside
    class="sidebar"
    :class="{ hover: isHover }"
    @mouseover="onHover()"
    @mouseleave="onUnhover()"
  >
    <div v-for="item in menuItems" :key="item.link" class="w-full">
      <RouterLink :to="item.link" class="sidebar-item">
        <div class="icon-wrapper">
          <img
            :class="item.iconClasses"
            :src="getImageUrl(item.icon)"
            :alt="item.text"
          />
        </div>
        <span v-if="isHover">{{ item.text }}</span>
      </RouterLink>
      <div v-if="item.spacer" class="spacer"></div>
    </div>
  </aside>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  icon: string;
  iconClasses?: string;
  link: string;
  text: string;
  spacer?: boolean;
}

const isHover = ref<boolean>(false);
const menuItems = ref<MenuItem[]>([
  {
    text: 'Login / Register',
    link: '/login',
    icon: 'user.png',
    iconClasses: '!w-16',
    spacer: true,
  },
  {
    text: 'Reservationen',
    link: '/reservations',
    icon: 'calendar.png',
    iconClasses: '!w-10',
  },
  {
    text: 'Lieblingsplätze',
    link: '/likes',
    icon: 'heart.png',
  },
  {
    text: 'Einstellungen',
    link: '/settings',
    icon: 'settings.png',
  },
]);

const getImageUrl = (name: string): string => {
  return new URL(`../assets/icons/${name}`, import.meta.url).href;
};

const onHover = (): void => {
  if (isHover.value) {
    return;
  }

  setTimeout(() => {
    isHover.value = true;
  }, 100);
};

const onUnhover = (): void => {
  isHover.value = false;
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply fixed top-5 left-5 w-20 bg-white z-[1000] rounded-2xl px-3 py-4 flex flex-col justify-center items-center gap-4;
  @apply shadow-lg transition-all;

  &:hover {
    @apply w-64;
  }

  .sidebar-item {
    @apply flex justify-between items-center gap-5 w-full;

    .icon-wrapper {
      @apply flex justify-center w-14;

      img {
        @apply w-12;
      }
    }

    &:hover span {
      @apply text-red-700;
    }

    span {
      @apply grow;
    }
  }

  .spacer {
    @apply w-full h-0.5 bg-gray-500 rounded mt-4;
  }
}
</style>
