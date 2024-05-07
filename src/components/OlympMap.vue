<template>
  <div id="map"></div>
  <div class="filters">
    <template v-for="icon in iconObjects" :key="icon.key">
      <Chip
        class="bg-white"
        :class="{ selected: isFilterSelected(icon) }"
        v-if="icon.isFilterable"
        :label="icon.name"
        :image="icon.filterIconUrl"
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
import L, {
  LatLngTuple,
  Layer,
  LayerGroup,
  Map,
  MapOptions,
  Marker,
} from 'leaflet';
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
let currentMarker = ref<Layer>();

const map = ref<Map>();
const markers = ref<LayerGroup>(new LayerGroup());

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

    if (currentMarker.value) {
      map.value!.removeLayer(currentMarker.value);
    }

    currentMarker.value = L.marker([lat, lng], {
      icon: icons.value.marker,
    }).addTo(map.value!);

    emit('marked', currentMarker.value);

    const popup = L.popup().setContent(
      'Um einen Sportplatz hier zu erfassen, <br>klicken Sie auf +'
    );
    currentMarker.value.bindPopup(popup).togglePopup();
  });
};

const loadSportFields = async () => {
  await sportFieldStore.loadFilteredSportFields();
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

    marker.on('click', () => openModal(sportField));
    markers.value.addLayer(marker);
  }

  markers.value.addTo(map.value!);
};

const openModal = (sportField: SportField): void => {
  sportFieldInfoDialogVisible.value = true;
  selectedSportField.value = sportField;
};

const filterSportFields = async (item: IconObject) => {
  sportFieldStore.setCategoryFilter(item.category);
  markers.value.clearLayers();
  await loadSportFields();
};

const isFilterSelected = (item: IconObject) => {
  return item.category === sportFieldStore.categoryFilter;
};
</script>

<style lang="scss">
#map {
  height: 100%;
  width: 100%;
}

.filters {
  @apply fixed z-[1000] top-8 left-72 flex justify-center items-center ml-4 gap-4 transition-colors;

  .p-chip {
    @apply shadow-2xl;
  }

  .p-chip:hover {
    @apply cursor-pointer;
  }

  .p-chip-image img {
    width: 1.8rem !important;
    height: 1.8rem !important;
    margin-left: -0.5rem !important;
  }
}
</style>

<style lang="scss" scoped>
.selected {
  @apply text-white bg-primaryRed;
}
</style>
