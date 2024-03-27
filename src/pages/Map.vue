<template>
  <OlympMap />
  <Button
    icon="pi pi-plus"
    rounded
    class="absolute bottom-0 right-0 z-[1000] m-8"
    @click="openDialog"
  />
  <SportsGroundCreateDialog :is-visible="visible" @close="visible = false" />
</template>

<script setup lang="ts">
import OlympMap from "@/components/OlympMap.vue";
import { ref } from "vue";
import SportsGroundCreateDialog from "@/components/SportsGroundCreateDialog.vue";

const visible = ref(false);

const openDialog = () => {
  visible.value = true;
};
</script>

<style scoped></style>
