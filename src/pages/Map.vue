<template>
  <OlympMap @marked="setMarked" />
  <Button
    icon="pi pi-plus"
    rounded
    class="absolute bottom-0 right-0 z-[1000] m-8"
    @click="openDialog"
  />
  <SportFieldCreateDialog :is-visible="visible"  :coordinates="coordinates" @close="visible = false" />
</template>

<script setup lang="ts">
import OlympMap from '@/components/OlympMap.vue';
import { ref } from 'vue';
// TODO fix import
import SportFieldCreateDialog from '@/components/SportFieldCreateDialog.vue';

import { LatLng } from 'leaflet';

const visible = ref(false);
const coordinates = ref();

const setMarked = (marker: L.Marker) => {
  const latLng: LatLng = marker.getLatLng();
  coordinates.value = `${latLng.lat}, ${latLng.lng}`;
};

const openDialog = () => {
  //TODO Abfragen ob User eingeloggt ist
  visible.value = true;
};
</script>

<style scoped></style>
