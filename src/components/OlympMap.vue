<template>
  <div id="map"></div>
  <div class="filters"></div>
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

import { SportField } from '@/types/SportField.ts';

import 'leaflet/dist/leaflet.css';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';

import { getIconName, iconObjects } from '@/services/iconService.ts';

interface IconKeyMap {
  [key: string]: Icon | DivIcon;
}

const sportFieldStore = useSportFieldStore();
let currentMarker: L.Marker;

const map = ref<Map>();
const sportFieldInfoDialogVisible = ref<boolean>(false);
const selectedSportField = ref<SportField | null>(null);
const sportFields = ref<SportField[]>([]);

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

  iconObjects.forEach(({ name, url }) => {
    iconKeyMap[name] = L.icon({
      iconUrl: url,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -30],
    });
  });

  iconKeyMap['stackedIcon'] = L.divIcon({
    html: '<span>1</span>',
  });

  return iconKeyMap;
};

const loadSportFields = (): void => {
  sportFieldStore.loadSportFields().then(() => {
    sportFields.value = sportFieldStore.sportFields;
    addMarkers();
  });
};

const addMarkers = (): Marker[] => {
  const markers: Marker[] = [];

  for (const sportField of sportFields.value) {
    const iconName = getIconName(sportField.category);
    if (!iconName) {
      continue;
    }

    if (icons.value[iconName] === undefined) {
      continue;
    }

    const marker: Marker = L.marker(
      [sportField.latitude, sportField.longitude],
      { icon: icons.value[iconName] }
    );

    marker.addTo(map.value!);
    marker.on('click', () => openModal(sportField));
    markers.push(marker);
  }

  return markers;
};

const openModal = (sportField: SportField): void => {
  sportFieldInfoDialogVisible.value = true;
  selectedSportField.value = sportField;
};
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  width: 100%;
}

.filters {
  @apply fixed h-20 w-60 bg-white z-[1000] top-5 right-5 rounded-2xl px-3 py-4 flex flex-col justify-center items-center;
}
</style>
