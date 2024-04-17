<template>
  <aside class="sidebar">
    <div v-for="item in menuItems" :key="item.link" class="w-full" v-if="demoStore">
      <RouterLink
        v-if="!item.hide && item.link"
        :to="item.disabled ? '' : item.link"
        class="sidebar-item"
      >
        <SidebarItem :item="item"></SidebarItem>
      </RouterLink>
      <div
        v-if="!item.hide && item.click"
        @click="item.click"
        class="sidebar-item"
        :class="{ 'cursor-pointer': !item.disabled }"
      >
        <SidebarItem :item="item"></SidebarItem>
      </div>
      <div v-if="item.spacer" class="spacer"></div>
    </div>
  </aside>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDemoStore } from '@/stores/DemoStore.ts';
import { storeToRefs } from 'pinia';
import SidebarItem from '@/layouts/SidebarItem.vue';
import { MenuItem } from '@/types/Menu.ts';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/UserStore.ts';
import { Auth0User, User } from '@/types/User.ts';
import { computed, inject, ref } from 'vue';
import { Methods, State } from '@/stores/DemoStore.ts';

const demoStore = useDemoStore();
const { isDemoActive } = storeToRefs(demoStore);

const { loginWithRedirect, logout } = useAuth0();
const userStore = useUserStore();

const user = computed<User | Auth0User | null>(() => userStore.user);

watch(isDemoActive, (newValue: boolean) => {
  menuItems.value
    .filter((item) => item.demo)
    .forEach((item) => (item.visible = !newValue));
});

const menuItems = computed<MenuItem[]>(() => [
  {
    id: 'login',
    text: user.value ? user.value.name : 'Login',
    click: (): void => {
      if (user.value) {
        return;
      }

      loginWithRedirect();
    },
    iconImg: 'user.png',
    iconClasses: '!w-16',
    spacer: true,
    visible: true,
    disabled: !!user.value,
  },
  {
    text: 'Karte',
    link: '/',
    iconImg: 'map.png',
    iconClasses: '!w-12',
    visible: true,
  },
  // {
  //   text: 'Reservationen',
  //   link: '/reservations',
  //   iconImg: 'calendar.png',
  //   iconClasses: '!w-10',
    // visible: true,
  //   demo: true,
  // },
  // {
  //   text: 'Lieblingsplätze',
  //   link: '/likes',
  //   iconImg: 'heart.png',
    //visible: true,
 //    demo: true,
  // },
  // {
  //   text: 'Einstellungen',
  //   link: '/settings',
  //   iconImg: 'settings.png',
  //   spacer: !!user.value,
    // visible: true,
  // },
  {
    text: 'Sportplatz-Anträge',
    link: '/proposals',
    iconImg: 'settings.png',
    spacer: !!user.value,
  },
  {
    text: 'Ausloggen',
    click: () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      userStore.user = null;
    },
    icon: 'pi pi-sign-out',
    hide: !user.value,
  },
]);
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
