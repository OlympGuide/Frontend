import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from '@/App.vue';

import '@/assets/styles/style.css';
import '@/assets/styles/olympGuideTheme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import InputIcon from 'primevue/inputicon';
import Toast from 'primevue/toast';

import { defineRules } from '@/validation/rules.ts';

import ToastService from 'primevue/toastservice';
import router from '@/router';

export const pinia = createPinia();
const app = createApp(App);

// Primevue components, add each component as needed
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);
app.component('TextArea', Textarea);
app.component('Calendar', Calendar);
app.component('InputIcon', InputIcon);
app.component('Toast', Toast);

//Vee Validate Rules
defineRules();

app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.use(ToastService);

app.mount('#app');
