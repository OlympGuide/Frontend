<template>
  <div class="page-container-placement">
    <p class="page-title">Sportplatz-Anträge</p>
    <DataTable :value="sportFieldProposals">
      <template v-if="sportFieldProposals.length">
        <Column
          v-for="column in columns"
          :key="column.field"
          :field="column.field"
          :header="column.header"
          :sortable="column.field === 'date'"
        >
          <template #body="{ data, field }">
            <span v-if="field === 'date'">{{ formatDate(data.date) }}</span>
            <Chip
              v-else-if="field === 'state'"
              :label="getState(data.state)"
              icon="pi pi-question-circle"
            />
            <span v-else>{{ data[field] }}</span>
          </template>
        </Column>
        <Column header="Actions" width>
          <template #body="proposals">
            <div class="flex justify-center items-center">
              <Button
                icon="pi pi-check"
                class="mr-2 w-8 h-8 rounded-full"
                @click="
                  handleProposal(
                    proposals.data.id,
                    SportFieldProposalState.Approved
                  )
                "
              />
              <Button
                icon="pi pi-times"
                class="mr-2 w-8 h-8 rounded-full"
                @click="
                  handleProposal(
                    proposals.data.id,
                    SportFieldProposalState.Denied
                  )
                "
              />
            </div>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSportFieldProposalStore } from '@/stores/SportFieldProposalStore.ts';
import { SportFieldProposal, SportFieldProposalState } from '@/types/Proposal';

const sportFieldProposalStore = useSportFieldProposalStore();
const sportFieldProposals = computed<SportFieldProposal[]>(
  () => sportFieldProposalStore.sportFieldProposals
);

const columns = [
  { field: 'sportFieldName', header: 'Name' },
  { field: 'sportFieldDescription', header: 'Beschreibung' },
  { field: 'date', header: 'Datum' },
  { field: 'sportFieldLatitude', header: 'Breitengrad' },
  { field: 'sportFieldLongitude', header: 'Längengrad' },
  { field: 'user', header: 'Benutzer' },
  { field: 'state', header: 'Status' },
];

onMounted(async () => {
  await loadProposals();
});

const loadProposals = async () => {
  await sportFieldProposalStore.loadSportFieldProposals();
};

const handleProposal = async (
  proposalId: string,
  state: SportFieldProposalState
) => {
  await sportFieldProposalStore.setSportFieldProposalState(proposalId, state);
  await loadProposals();
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('de-CH');
};

const getState = (state: number): string => {
  return SportFieldProposalState[state];
};
</script>

<style scoped></style>
