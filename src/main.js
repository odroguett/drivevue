import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import VueAxios from "vue-axios";

import variablesEntorno from "./variablesEntorno/env";

const app = createApp(App);
axios.defaults.baseURL = variablesEntorno.baseURL;
app.use(VueAxios, axios);
app.use(store);
app.use(router);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
