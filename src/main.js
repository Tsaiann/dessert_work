import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import request from '@/api/request'
//import axios from 'axios'
//import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import '@/styles/style.scss'

const app = createApp(App)
//app.config.globalProperties.$request = request
app.use(store)
app.use(router)
//app.use(VueAxios, axios)
app.use(PrimeVue)
app.component('Dialog', Dialog)
app.mount('#app')