import {RouterOptions, createRouter, createWebHistory} from 'vue-router';

import NotFound from '@/pages/NotFound.vue';
import Map from '@/pages/Map.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';

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
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
};

const router = createRouter(routerOptions);

export default router;
