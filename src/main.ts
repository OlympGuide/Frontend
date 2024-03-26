import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'
import PrimeVue from 'primevue/config'

import './style.css'
import App from '@/App.vue'
import NotFound from '@/pages/NotFound.vue'
import Map from '@/pages/Map.vue'

import 'primevue/resources/themes/lara-light-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Button from "primevue/button"
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";


const routes = [
    {path: '/', component: Map},
    {path: '/:pathMatch(.*)*', component: NotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()
const app = createApp(App)

// Primevue components, add each component as needed
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText)
app.component('FloatLabel', FloatLabel)
app.use(router)
app.use(PrimeVue)
app.use(pinia)

app.mount('#app')

