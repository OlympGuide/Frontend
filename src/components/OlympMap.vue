<template>
  <div id="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L, { Icon, Map, MapOptions, Marker } from 'leaflet'

import { Place } from '@/types/Map';

import { toLatLng } from '@/services/leaflet';

// @ts-ignore
import { data } from '@/testData/data.js';

import 'leaflet/dist/leaflet.css';

interface IconKeyMap {
  [key: string]: L.Icon;
}

const map = ref<Map>();
const testData: Place[] = data;

const icons = ref<IconKeyMap>({});

onMounted((): void => {
  map.value = createMap();
  icons.value = createIcons();
  addMarkers();
});

const createMap = (): Map => {
  const mapOptions: MapOptions = {
    center: [47.4971624, 8.7289052],
    zoom: 15,
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

const createIcons = (): IconKeyMap => {
  const iconKeyMap: IconKeyMap = {};

  const footballIcon: Icon = L.icon({
    iconUrl: 'src/assets/icons/football.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -30],
  });

  iconKeyMap['football'] = footballIcon;

  return iconKeyMap;
}

const addMarkers = (): Marker[] => {
  const markers: Marker[] = [];

  testData.forEach((place: Place) => {
    const marker: Marker = L.marker(toLatLng(place.coordinates), { icon: icons.value.football }).addTo(map.value!);
    markers.push(marker);
  });

  return markers;
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
