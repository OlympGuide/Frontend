<template>
  <ConfirmPopup />
  <Button
    id="triggerButton"
    ref="triggerButton"
    class="absolute hidden right-10 top-100 z-[1000]"
  ></Button>
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

import { ShowSportField } from '@/types/Map';

import 'leaflet/dist/leaflet.css';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';

import Button from 'primevue/button';
import ConfirmPopup from 'primevue/confirmpopup';

import footballIconUrl from '@/assets/icons/football.png';

interface IconKeyMap {
  [key: string]: Icon | DivIcon;
}

const sportFieldStore = useSportFieldStore();
let currentMarker: L.Marker;

const map = ref<Map>();
const sportFieldInfoDialogVisible = ref<boolean>(false);
const selectedSportField = ref<ShowSportField | null>(null);
const sportFields = ref<ShowSportField[]>([]);

const icons = ref<IconKeyMap>({});

const emit = defineEmits(['marked']);

onMounted((): void => {
  map.value = createMap();
  icons.value = createIcons();

  loadSportFields();
  addMarkers();
  addClickListener();
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

const triggerButton = ref<Button>();
const addClickListener = (): void => {
  map.value!.on('click', (e) => {
    const { lat, lng } = e.latlng;

    if (currentMarker) {
      map.value!.removeLayer(currentMarker);
    }

    currentMarker = L.marker([lat, lng], { icon: icons.value.marker }).addTo(
      map.value!
    );

    emit('marked', currentMarker);

    const popup = L.popup().setContent(
      'Um einen Sportplatz hier zu erfassen, <br>klicken Sie auf +'
    );
    currentMarker.bindPopup(popup).togglePopup();
  });
};

const createIcons = (): IconKeyMap => {
  const iconKeyMap: IconKeyMap = {};

  const footballIcon: Icon = L.icon({
    iconUrl: footballIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -30],
  });

  const markerIcon: Icon = L.icon({
    iconUrl: 'src/assets/icons/marker.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -30],
  });

  const stackedIcon: DivIcon = L.divIcon({
    html: '<span>1</span>',
  });

  iconKeyMap['football'] = footballIcon;
  iconKeyMap['stackedIcon'] = stackedIcon;
  iconKeyMap['marker'] = markerIcon;

  return iconKeyMap;
};

const loadSportFields = (): void => {
  sportFieldStore.loadSportFields()
  .then(_ => {
    sportFields.value = sportFieldStore.sportFields;
    addMarkers();
  });
};

const addMarkers = (): Marker[] => {
  const markers: Marker[] = [];

  for (const sportField of sportFields.value) {
    // let stackCounter: number = 0;

    // for (const nextPlace of sportFields.value) {
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
      [sportField.SportFieldLatitude, sportField.SportFieldLongitude],
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

const openModal = (sportField: ShowSportField): void => {
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
