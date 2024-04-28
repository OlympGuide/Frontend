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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import Chip from 'primevue/chip';
import Dropdown from 'primevue/dropdown';

import { defineRules } from '@/validation/rules.ts';

import ToastService from 'primevue/toastservice';
import router from '@/router';
export const pinia = createPinia();

import { createAuth0 } from '@auth0/auth0-vue';
const app = createApp(App);

// Primevue components, add each component as needed
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);
app.component('TextArea', Textarea);
app.component('Calendar', Calendar);
app.component('InputIcon', InputIcon);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Toast', Toast);
app.component('Chip', Chip);
app.component('Dropdown', Dropdown);

//Vee Validate Rules
defineRules();

app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.use(ToastService);

app.use(
  createAuth0({
    domain: 'dev-ooenivxi0xqapns6.us.auth0.com',
    clientId: 'cnWkVX30s8jQC2BQsfG3Yse9yAOaPHWZ',
    authorizationParams: {
      audience: 'OlympGuideBackend',
      redirect_uri: window.location.origin,
    },
  })
);

app.mount('#app');
