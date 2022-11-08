import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";
import router from "./router";
import { createPinia } from "pinia";

import "./styles/element/index.scss";
import ElementPlus from "element-plus";

import svgIcon from "@/components/SvgIcon.vue";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .component("svg-icon", svgIcon)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
