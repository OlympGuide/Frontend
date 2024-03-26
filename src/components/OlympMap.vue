<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L, { Map, MapOptions } from 'leaflet'

import 'leaflet/dist/leaflet.css';

const map = ref<Map>();

onMounted(() => {
  map.value = createMap();
});

const createMap = () => {
  const mapOptions: MapOptions = {
    center: [47.4971624, 8.7289052],
    zoom: 16,
    zoomControl: false,
  };

  const map: Map = L.map('map', {
    ...mapOptions,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20
  }).addTo(map);

  return map;
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
