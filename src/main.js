import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import '@/styles/style.scss'

const app = createApp(App)
app.use(PrimeVue)
app.component('Dialog', Dialog)
app.use(store)
app.use(router)
app.mount('#app')