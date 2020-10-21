import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// const app = createApp()
// app.config.productionTip = false

createApp(App).use(Antd).use(VueAxios, axios).use(store).use(router).mount('#app')
