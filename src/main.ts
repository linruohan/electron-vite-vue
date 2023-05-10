import { createApp } from 'vue'
// import "./style.css"
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";

import "@/assets/css/element_index.scss";
import ElementPlus from "element-plus";

import svgIcon from "@/components/SvgIcon.vue";
import PrimeVue from 'primevue/config';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(createPinia())
  .use(ElementPlus)
  .component("svg-icon", svgIcon)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
