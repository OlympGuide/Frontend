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

import { defineRule } from 'vee-validate';
import { min } from '@vee-validate/rules';

import router from '@/router';

const pinia = createPinia();
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

//Vee Validate Rules
defineRule('required', (value: string) => {
  return value.length > 0 || 'Das Feld darf nicht leer sein';
});
//defineRule("required", required);
defineRule('min', min);

defineRule('coordinatePair', (value: string) => {
  const coordinateRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
  return (
    coordinateRegex.test(value) ||
    'Bitte verwenden Sie das Format: Breitengrad, Längengrad'
  );
});

app.use(router);
app.use(PrimeVue);
app.use(pinia);

app.mount('#app');
