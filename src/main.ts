import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import './style.css'
import App from '@/App.vue'
import NotFound from '@/pages/NotFound.vue'
import Map from '@/pages/Map.vue'

const routes = [
    { path: '/', component: Map },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
