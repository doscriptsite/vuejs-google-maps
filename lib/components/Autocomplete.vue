<template>
  <input ref="input" type="text" v-model="autocompleteModel" @input="onInputChange" :placeholder="placeholder">
</template>

<script>
import BoundProps from '../mixins/BoundProps'
import Events from '../mixins/Events'
import Ready from '../mixins/Ready'
import FindElement from '../mixins/FindElement'
import { redirectMethods } from '../utils/redirect-methods'

const redirectedMethods = [
  'getBounds',
  'getPlace',
  'setBounds'
]

export default {
  name: 'GoogleMapAutocomplete',
  mixins: [
    BoundProps,
    Events,
    FindElement,
    Ready
  ],
  props: {
    value: null,
    model: String,
    placeholder: {
      type: String,
      default: 'Search on map'
    },
    updateMap: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autocompleteModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...redirectMethods({
      target () {
        return this.$_autocomplete
      },
      names: redirectedMethods
    }),
    onInputChange (event) {
      this.$emit('update:model', event.target.value)
    }
  },
  created () {
    const mapAncestor = this.$_findAncestor(
      a => a.$options.name === 'GoogleMap'
    )
    if (!mapAncestor) {
      return
    }
    this.$_mapAncestor = mapAncestor
  },
  async googleMapsPrepare () {
    const mapComp = this.$_mapAncestor
    this.$_map = mapComp ? await mapComp.$_getMap() : null
  },
  googleMapsReady () {
    this.$_autocomplete = new window.google.maps.places.Autocomplete(this.$refs.input)

    if (this.$_map) {
      this.$_autocomplete.bindTo('bounds', this.$_map)
    }

    this.$_autocomplete.addListener('place_changed', () => {
      let place = this.$_autocomplete.getPlace()
      this.$emit('place-changed', place)
      this.$emit('update:model', place.formatted_address)

      if (this.$_map && this.updateMap) {
        if (place.geometry.viewport) {
          this.$_map.fitBounds(place.geometry.viewport)
        } else {
          this.$_map.setCenter(place.geometry.location)
        }
      }
    })
  }
}
</script>
