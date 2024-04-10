import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import 'primeflex/primeflex.css';
import "primevue/resources/themes/saga-blue/theme.css";

import primevueconfig from "./primevueconfig";

const app = createApp(App);

const components = primevueconfig.components;

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

components.forEach((component) => {
  app.component(component.name, component.component);
});

app.mount("#app");
