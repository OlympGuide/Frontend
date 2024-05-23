<template>
  <div class="page-container-placement">
    <p class="page-title">Meine Reservationen</p>
    <DataTable :value="reservations">
      <template v-if="reservations.length">
        <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"
          :sortable="column.field === 'date'">
          <template #body="{ data, field }">
            <span v-if="field === 'sportfieldName'">{{ data.sportField.name }}</span>
            <span v-else-if="field === 'start'">
              {{ toLocalDate(data.start) }}
            </span>
            <span v-else-if="field === 'end'">
              {{ toLocalDate(data.end) }}
            </span>
            <span v-else>
              {{ data[field] }}
            </span>
          </template>
        </Column>
        <Column header="Kalender" width>
          <template #body="{ data }">
            <router-link :to="`/reserve/${data.sportFieldId}/reservation/${data.id}`"
              class="p-button p-button-text">Verwalten</router-link>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useReservationStore } from '@/stores/ReservationStore.ts';
import { Reservation } from '@/types/Reservation.ts';
import { toLocalDate } from '@/services/dateService.ts';
import { useUserStore } from '@/stores/UserStore.ts';
import { storeToRefs } from 'pinia';

const reservationStore = useReservationStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const reservations = computed<Reservation[]>(
  () => reservationStore.myReservations
);

const columns = [
  { field: 'sportfieldName', header: 'Sportplatz' },
  { field: 'start', header: 'Start' },
  { field: 'end', header: 'Ende' },
];

onMounted(async () => {
  await loadMyReservations();
});

watch(user, async () => {
  await loadMyReservations();
});

const loadMyReservations = async () => {
  await reservationStore.loadMyReservations();
};
</script>

<style scoped></style>
