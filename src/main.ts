import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/src/index.scss'
import '@/assets/style/normalize.css'

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
