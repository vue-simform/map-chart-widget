import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapHeighLightStatic from '../views/MapHeighLightStatic.vue'
import MapHeighLightClick from '../views/MapHeighLightClick.vue'
import ProvinceDetails from '../views/ProvinceDetails.vue'
import LineChart from '../views/LineChart.vue'
import WidgetChart from '../views/WidgetChart.vue'
import ChartApplication from '../views/ChartApplication.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/filterChart',
      name: 'FilterChart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilterChart.vue')
    },
    {
      path: '/mapClick',
      name: 'MapHeighLightClick',
      component: MapHeighLightClick
    },
    {
      path: '/mapStatic',
      name: 'MapHeighLightStatic',
      component: MapHeighLightStatic
    },
    {
      path: '/province/:province',
      name: 'province-details',
      component: ProvinceDetails
    },
    {
      path: '/lineChart',
      name: 'LineChart',
      component: LineChart
    },
    {
      path: '/widgetChart',
      name: 'WidgetChart',
      component: WidgetChart
    },
    {
      path: '/chartApplication',
      name: 'ChartApplication',
      component: ChartApplication
    }
  ]
})

export default router
