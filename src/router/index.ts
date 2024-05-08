import { createRouter, createWebHistory, RouterOptions } from 'vue-router';

import NotFound from '@/pages/NotFound.vue';
import Map from '@/pages/Map.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';
import Reservations from '@/pages/Reservations.vue';
import Likes from '@/pages/Likes.vue';
import Settings from '@/pages/Settings.vue';
import Proposals from '@/pages/Proposals.vue';
import Reserve from '@/pages/Reserve.vue';
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
      path: '/reserve/:id',
      name: 'Reserve',
      meta: {
        layout: SidebarLayout,
      },
      component: Reserve,
    },
    {
      path: '/reserve/:id/reservation/:reservationId',
      name: 'Reservation',
      meta: {
        layout: SidebarLayout,
      },
      component: Reserve,
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
      path: '/proposals',
      name: 'Proposals',
      meta: {
        layout: SidebarLayout,
        admin: true,
      },
      component: Proposals,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
};

const router = createRouter(routerOptions);

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  if (to.meta.admin) {
    if (userStore.isAdministrator) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
