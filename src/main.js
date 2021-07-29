import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '../dist/vuejs-google-maps.css'

import VueGoogleMap from '../lib'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueGoogleMap, {
  load: {
    apiKey: process.env.VUE_APP_GOOGLE_APIKEY,
    libraries: [
      'places'
    ],
    language: 'en',
    region: 'en-US'
  }
})

new Vue({
  data () {
    return {
      defaultMapOptions: {
        zoom: 8,
        minZoom: 3,
        center: {
          lat: 37.09024,
          lng: -95.712891
        }
      }
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
