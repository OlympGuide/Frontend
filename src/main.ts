import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import PrimeVue from "primevue/config";

import "./style.css";
import App from "@/App.vue";
import NotFound from "@/pages/NotFound.vue";
import Map from "@/pages/Map.vue";

import "./olympGuideTheme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";

import { defineRule } from "vee-validate";
import { required, min } from "@vee-validate/rules";

const routes = [
  { path: "/", component: Map },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App);

// Primevue components, add each component as needed
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("TextArea", Textarea);

//Vee Validate Rules
defineRule("required", required);
defineRule("min", min);
defineRule("coordinatePair", (value: string) => {
  const coordinateRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
  return (
    !value ||
    coordinateRegex.test(value) ||
    "Ungültiges Koordinatenformat. Bitte verwenden Sie das Format: Breitengrad, Längengrad"
  );
});

app.use(router);
app.use(PrimeVue);
app.use(pinia);

app.mount("#app");
