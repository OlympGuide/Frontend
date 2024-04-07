<template>
  <OlympMap @marked="setMarked" />
  <Button
    icon="pi pi-plus"
    rounded
    class="absolute bottom-0 right-0 z-[1000] m-8"
    @click="openDialog"
  />
  <SportsGroundCreateDialog
    :is-visible="visible"
    :coordinates="coordinates"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
import OlympMap from '@/components/OlympMap.vue';
import { ref } from 'vue';
import SportsGroundCreateDialog from '@/components/SportFieldCreateDialog.vue';
import { LatLng } from 'leaflet';

const visible = ref(false);
const coordinates = ref();

const setMarked = (marker: L.Marker) => {
  console.log('We are marking');
  const latLng: LatLng = marker.getLatLng();
  coordinates.value = `${latLng.lat}, ${latLng.lng}`;
};

const openDialog = () => {
  visible.value = true;
};
</script>

<style scoped></style>