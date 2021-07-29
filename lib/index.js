'use strict'

import { version } from '../package.json'
import 'regenerator-runtime/runtime'
import loader from './lib-loader'
import { optionMergeStrategies } from './options'
import { initErrorHandling } from './utils/error'
import Map from './components/Map'
import Marker from './components/Marker'
import Autocomplete from './components/Autocomplete'
import PlaceDetails from './components/PlaceDetails'

export {
  Map,
  Marker,
  PlaceDetails,
  Autocomplete
}

function registerComponents (Vue, prefix) {
  Vue.component(`${prefix}`, Map)
  Vue.component(`${prefix}-marker`, Marker)
  Vue.component(`${prefix}-autocomplete`, Autocomplete)
  Vue.component(`${prefix}-placedetails`, PlaceDetails)
}

// @see: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const defaultOptions = {
  zoom: 5,
  center: {
    lat: 11.45731039,
    lng: 104.8740308
  }
}

export default {
  version: version,
  install (Vue, options) {
    const finalOptions = Object.assign({}, {
      installComponents: true,
      componentsPrefix: 'google-map',
      mapOptions: defaultOptions
    }, options)

    Vue.prototype.$googleMap = finalOptions.mapOptions

    optionMergeStrategies(Vue)
    initErrorHandling(Vue)

    if (finalOptions.installComponents) {
      registerComponents(Vue, finalOptions.componentsPrefix)
    }

    if (finalOptions.load) {
      loader.load(finalOptions.load)
    }
  }
}
