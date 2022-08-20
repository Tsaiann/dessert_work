import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config'
import { useRouter } from 'vue-router'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import '@/styles/style.scss'

import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import Message from 'primevue/message'
import ToastService from 'primevue/toastservice'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import Breadcrumb from 'primevue/breadcrumb'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Row from 'primevue/row'
import Paginator from 'primevue/paginator'
import Menubar from 'primevue/menubar'
import Steps from 'primevue/steps'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Carousel from 'primevue/carousel'
import Galleria from 'primevue/galleria'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.use(useRouter, router)
app.use(PrimeVue)
app.component('Menubar', Menubar)
app.component('Toast', Toast)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('Galleria', Galleria)
app.component('Steps', Steps)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Breadcrumb', Breadcrumb)
app.component('RadioButton', RadioButton)
app.component('Carousel', Carousel)
app.component('Row', Row)
app.component('Paginator', Paginator)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Checkbox', Checkbox)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('Message', Message)
app.component('Button', Button)
app.use(ToastService)
app.mount('#app')
