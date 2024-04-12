<template>
  <aside class="sidebar">
    <div v-for="item in menuItems" :key="item.link" class="w-full">
      <RouterLink v-if="item.link" :to="item.link" class="sidebar-item">
        <SidebarItem :item="item"></SidebarItem>
      </RouterLink>
      <div
        v-if="item.click"
        @click="item.click"
        class="sidebar-item cursor-pointer"
      >
        <SidebarItem :item="item"></SidebarItem>
      </div>
      <div v-if="item.spacer" class="spacer"></div>
    </div>
  </aside>

  <div
    v-if="showLoginDialog"
    class="absolute w-full h-full bg-gray-700 z-[1000] opacity-70"
  ></div>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SidebarItem from '@/layouts/SidebarItem.vue';
import { MenuItem } from '@/types/Menu.ts';
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, logout } = useAuth0();

const menuItems = ref<MenuItem[]>([
  {
    text: 'Login',
    click: () => {
      // showLoginDialog.value = !showLoginDialog.value;
      loginWithRedirect();
    },
    iconImg: 'user.png',
    iconClasses: '!w-16',
    spacer: true,
  },
  {
    text: 'Karte',
    link: '/',
    iconImg: 'map.png',
    iconClasses: '!w-12',
  },
  {
    text: 'Reservationen',
    link: '/reservations',
    iconImg: 'calendar.png',
    iconClasses: '!w-10',
  },
  {
    text: 'Lieblingsplätze',
    link: '/likes',
    iconImg: 'heart.png',
  },
  {
    text: 'Einstellungen',
    link: '/settings',
    iconImg: 'settings.png',
    spacer: true,
  },
  {
    text: 'Ausloggen',
    click: () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    },
    icon: 'pi pi-sign-out',
  },
]);

const showLoginDialog = ref<boolean>(false);
</script>

<style lang="scss">
.sidebar {
  @apply fixed top-5 left-5 w-20 bg-white z-[1000] rounded-2xl px-3 py-4 flex flex-col justify-center items-center gap-4;
  @apply shadow-lg transition-all;

  &:hover {
    @apply w-64;
  }

  &:hover .sidebar-item {
    @apply gap-5;
  }

  &:hover .text {
    @apply grow transition-all;
    opacity: 100 !important;
  }

  .sidebar-item {
    @apply flex justify-between items-center w-full;

    .icon-wrapper {
      @apply flex justify-center min-w-14 max-w-14;

      img {
        @apply w-12;
      }
    }

    &:hover .text {
      @apply text-red-700;
    }

    .text {
      @apply opacity-0 w-0;
    }
  }

  .spacer {
    @apply w-full h-0.5 bg-gray-500 rounded mt-4;
  }
}
</style>
