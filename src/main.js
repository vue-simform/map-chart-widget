import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import { CustomChartWidget } from 'custom-chart-widget'

import App from './App.vue'
import router from './router'

const app = createApp(App)
customElements.define('custom-chart-widget', CustomChartWidget)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
