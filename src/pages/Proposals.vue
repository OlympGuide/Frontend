<template>
  <div class="page-container-placement">
    <p class="page-title">Proposals</p>
    <DataTable :value="sportFieldProposals">
      <template #header>
        Proposals
      </template>

      <template v-if="sportFieldProposals.length">
        <Column v-for="(value, key) in sportFieldProposals[0]" :key="key" :field="key" :header="key">
          {{ value }}
          <!-- TODO format columns -->
          <!-- <template #body> -->
            <!-- {{ value }} -->
            <!-- <span v-if="key === 'date'">{{ formatDate(value) }}</span> -->
            <!-- <span v-else-if="key === 'userId'">{{value}}</span>
            <span v-else-if="key === 'state'">{{ formatState(value) }}</span>
            <span v-else>{{ value }}</span> -->
          <!-- </template> -->
        </Column>
        <Column header="Actions" width>
          <template #body="proposals">
            <div class="flex justify-center">
              <Button
                icon="pi pi-check"
                class="mr-2"
                @click="handleProposal(proposals.data.id, SportFieldProposalState.Approved)"
              />
              <Button 
                icon="pi pi-times"
                class="mr-2"
                @click="handleProposal(proposals.data.id, SportFieldProposalState.Denied)"
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
const sportFieldProposals = computed<SportFieldProposal[]>(() => sportFieldProposalStore.sportFieldProposals);

onMounted((): void => {
  loadProposals();
});

const loadProposals = (): void => {
  console.log('load proposals')
  sportFieldProposalStore.loadSportFieldProposals();
};

const handleProposal = ( proposalId: string, state: SportFieldProposalState ) => {
  sportFieldProposalStore.setSportFieldProposalState(proposalId, state);
};

// TODO format columns
// const formatDate = (dateString: any) => {
//   return new Date(dateString).toLocaleString('de-CH');
// };

// const formatState = (state: any) => {
//   return SportFieldProposalState[state];
// };
</script>

<style scoped></style>
