import Vue from 'vue'
import VueRouter from 'vue-router'

import PlaceSearch from './components/PlaceSearch.vue'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', name: 'place-search', label: 'Place Search', component: PlaceSearch },
  ]
})

Vue.use(VueRouter)

export default router
