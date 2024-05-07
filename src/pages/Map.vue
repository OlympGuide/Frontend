<template>
  <OlympMap @marked="setMarked" />
  <Button
    icon="pi pi-plus"
    data-cy="sportsfield-dialog-button"
    rounded
    class="absolute bottom-0 right-0 z-[1000] m-8 !bg-primaryRed"
    @click="openDialog"
  />
  <SportFieldCreateDialog
    :is-visible="visible"
    :coordinates="coordinates"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
import OlympMap from '@/components/OlympMap.vue';
import { ref } from 'vue';

import SportFieldCreateDialog from '@/components/SportFieldCreateDialog.vue';
import { LatLng } from 'leaflet';
import { useAuth0 } from '@auth0/auth0-vue';

const visible = ref(false);
const coordinates = ref();

const { loginWithRedirect, isAuthenticated } = useAuth0();

const setMarked = (marker: L.Marker) => {
  const latLng: LatLng = marker.getLatLng();
  coordinates.value = `${latLng.lat}, ${latLng.lng}`;
};

const openDialog = () => {
  if (isAuthenticated.value) {
    visible.value = true;
  } else {
    loginWithRedirect();
  }
};
</script>

<style scoped></style>
