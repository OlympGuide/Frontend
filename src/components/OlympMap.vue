<template>
  <div id="map"></div>
  <SportFieldInfoDialog
    v-if="selectedSportField"
    v-model:visible="sportFieldInfoDialogVisible"
    :sport-field="selectedSportField"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L, {
  DivIcon,
  Icon,
  LatLngTuple,
  Map,
  MapOptions,
  Marker,
} from 'leaflet';
import SportFieldInfoDialog from '@/components/SportFieldInfoDialog.vue';

import { SportField } from '@/types/Map';

// @ts-ignore
import { data } from '@/testData/data.js';

import 'leaflet/dist/leaflet.css';

interface IconKeyMap {
  [key: string]: Icon | DivIcon;
}

const map = ref<Map>();
const sportFieldInfoDialogVisible = ref<boolean>(false);
const selectedSportField = ref<SportField | null>(null);
const testData: SportField[] = data;

const icons = ref<IconKeyMap>({});

onMounted((): void => {
  map.value = createMap();
  icons.value = createIcons();
  addMarkers();
});

const createMap = (): Map => {
  const center: LatLngTuple = [47.4971624, 8.7289052];

  const mapOptions: MapOptions = {
    center,
    zoom: 15,
    zoomControl: false,
  };

  const map: Map = L.map('map', {
    ...mapOptions,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    }
  ).addTo(map);

  // TODO: activate on dev/prod
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
  //     const location: LatLngTuple = [position.coords.latitude, position.coords.longitude];
  //     map.panTo(location);
  //   });
  // }

  return map;
};

const createIcons = (): IconKeyMap => {
  const iconKeyMap: IconKeyMap = {};

  const footballIcon: Icon = L.icon({
    iconUrl: 'src/assets/icons/football.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -30],
  });

  const stackedIcon: DivIcon = L.divIcon({
    html: '<span>1</span>',
  });

  iconKeyMap['football'] = footballIcon;
  iconKeyMap['stackedIcon'] = stackedIcon;

  return iconKeyMap;
};

const addMarkers = (): Marker[] => {
  const markers: Marker[] = [];

  for (const sportField of testData) {
    // let stackCounter: number = 0;

    // for (const nextPlace of testData) {
    //   if (sportField === nextPlace) {
    //     break;
    //   }

    // TODO: Finish in KAN-39: https://olympguide.atlassian.net/browse/KAN-39
    // const latLngThis: LatLng = latLng(sportField.coordinates);
    // const latLngNext: LatLng = latLng(nextPlace.coordinates);

    // if (latLngThis.distanceTo(latLngNext) < 2000) {
    //   stackCounter++;
    // }
    // }

    // if (stackCounter === 0) {
    const marker: Marker = L.marker(
      [sportField.latitude, sportField.longitude],
      { icon: icons.value.football }
    );
    marker.addTo(map.value!);
    marker.on('click', () => openModal(sportField));
    markers.push(marker);
    // } else if (stackCounter === 1) {
    //   const marker: Marker = L.marker([sportField.latitude, sportField.longitude], {icon: icons.value.stackedIcon});
    //   marker.addTo(map.value!);
    //   markers.push(marker);
    // }
  }

  return markers;
};

const openModal = (sportField: SportField): void => {
  sportFieldInfoDialogVisible.value = true;
  selectedSportField.value = sportField;
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
