<template lang="html">

  <div class="simple-map">

    <google-map-autocomplete ref="Place" @place-changed="onPlaceChanged" class="autocomplete"/>

    <google-map
      id="map"
      ref="Map"
      :center.sync="center"
      :options="mapOptions"
      @idle="onIdle">

      <google-map-marker v-if="place" :clickable="false" :draggable="false" :position="center" label="Reference Position" @dragend="getCoordinates"/>
    </google-map>

  </div>

</template>

<script>
export default {
  data () {
    return {
      center: {
        lat: 37.09024,
        lng: -95.712891
      },
      mapOptions: {
        zoom: 3,
        minZoom: 2,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
      },
      place: null,
    }
  },
  methods: {
    onPlaceChanged (data) {
      console.log(data);
      this.place = data;
      this.center = {
        lat: data.geometry.location.lat(),
        lng: data.geometry.location.lng()
      };
      console.log(this.center);
      this.mapOptions.zoom = 18;
    },
    onIdle (map) {
      this.mapBounds = map.getBounds()
      this.$refs.Place.setBounds(this.mapBounds)
    },
    getCoordinates (data) {
      console.log(data);
    },
  }
}
</script>
<style>
.autocomplete {
  position: absolute;
  top: 20px;
  width: 600px;
  left: 100px;
  z-index: 999;
}
</style>
