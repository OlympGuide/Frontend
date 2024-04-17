import { createRouter, createWebHistory, RouterOptions } from 'vue-router';

import NotFound from '@/pages/NotFound.vue';
import Map from '@/pages/Map.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';
import Reservations from '@/pages/Reservations.vue';
import Likes from '@/pages/Likes.vue';
import Settings from '@/pages/Settings.vue';
import { useUserStore } from '@/stores/UserStore.ts';

export const routerOptions: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Map',
      meta: {
        layout: SidebarLayout,
      },
      component: Map,
    },
    {
      path: '/reservations',
      name: 'Reservations',
      meta: {
        layout: SidebarLayout,
      },
      component: Reservations,
    },
    {
      path: '/likes',
      name: 'Likes',
      meta: {
        layout: SidebarLayout,
      },
      component: Likes,
    },
    {
      path: '/settings',
      name: 'Settings',
      meta: {
        layout: SidebarLayout,
      },
      component: Settings,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
};

const router = createRouter(routerOptions);

router.beforeEach(async (_to, _from, next) => {
  const userStore = useUserStore();

  // TODO: implement admin barrier
  if (userStore.isAuthenticated) {
    next();
    return;
  }
  next();
});

export default router;
