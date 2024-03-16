import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/src/index.scss'
import '@/assets/style/normalize.css'
// import './style.css'
import svgIcon from '@/components/SvgIcon.vue'
// import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .component('svg-icon', svgIcon)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
