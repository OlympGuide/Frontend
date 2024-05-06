<template>
  <div id="map"></div>
  <div class="filters">
    <template v-for="icon in iconObjects" :key="icon.key">
      <Chip
        class="bg-white"
        v-if="icon.isFilterable"
        :label="icon.name"
        :image="icon.url"
        @click="filterSportFields(icon)"
      />
    </template>
  </div>
  <SportFieldInfoDialog
    v-if="selectedSportField"
    v-model:visible="sportFieldInfoDialogVisible"
    :sport-field="selectedSportField"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L, { LatLngTuple, LayerGroup, Map, MapOptions, Marker } from 'leaflet';
import SportFieldInfoDialog from '@/components/SportFieldInfoDialog.vue';

import { SportField } from '@/types/SportField.ts';

import 'leaflet/dist/leaflet.css';
import { useSportFieldStore } from '@/stores/SportFieldStore.ts';

import {
  createIcons,
  getIconKey,
  IconKeyMap,
  IconObject,
  iconObjects,
} from '@/services/iconService.ts';

const sportFieldStore = useSportFieldStore();
let currentMarker: L.Marker;

const map = ref<Map>();
const markers = new LayerGroup();

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

const loadSportFields = async () => {
  await sportFieldStore.loadSportFields();
  sportFields.value = sportFieldStore.sportFields;
  addMarkers();
};

const addMarkers = () => {
  for (const sportField of sportFields.value) {
    const iconName = getIconKey(sportField.category);
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
    markers.value.push(marker);
  }
};

const openModal = (sportField: SportField): void => {
  sportFieldInfoDialogVisible.value = true;
  selectedSportField.value = sportField;
};

const filterSportFields = (item: IconObject) => {
  sportFieldStore.addOrRemoveCategoryFilter(item.category);
  sportFields.value = sportFieldStore.sportFields.filter((sportField) =>
    sportFieldStore.categoryFilters.includes(sportField.category)
  );
  markers.clearLayers();
  addMarkers();
};
</script>

<style lang="scss">
#map {
  height: 100%;
  width: 100%;
}

.filters {
  @apply fixed z-[1000] top-8 left-72 flex justify-center items-center ml-4 gap-4;

  .p-chip {
    @apply shadow-2xl;
  }

  .p-chip:hover {
    @apply cursor-pointer;
  }

  .p-chip-image img {
    width: 2rem !important;
    height: 2rem !important;
  }
}
</style>
