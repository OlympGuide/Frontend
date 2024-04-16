import { createRouter, createWebHistory, RouterOptions } from 'vue-router';

import NotFound from '@/pages/NotFound.vue';
import Map from '@/pages/Map.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';
import Reservations from '@/pages/Reservations.vue';
import Likes from '@/pages/Likes.vue';
import Settings from '@/pages/Settings.vue';
import Login from "@/pages/Login.vue";
import Proposals from "@/pages/Proposals.vue";

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
      path: '/login',
      name: 'Login',
      meta: {
        layout: SidebarLayout,
      },
      component: Login,
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
      path: '/proposals',
      name: 'Proposals',
      meta: {
        layout: SidebarLayout,
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

export default router;
