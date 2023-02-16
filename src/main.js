import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入router
import store from './store' // 引入store
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/utils/fontawsome";
import api from './api/index.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "vue-progressive-image/dist/style.css";
import {getWindowWidth} from '@/utils/utils.js'

createApp(App)
  .use(store) // 使用 store
  .use(router) // 使用 router
  .use(ElementPlus)
  .directive('resize',getWindowWidth)
  .component('font-awesome-icon', FontAwesomeIcon)
  .provide('$axios', api.api)
  .mount('#app')
