<template>
  <div>
    <FloatLabel class="float-label-input font-bold">
      <AutoComplete
        type="text"
        class="basic-input-area w-full relative"
        forceSelection
        v-model="addressValue"
        @complete="debouncedSearchAddresses"
        :suggestions="addresses"
        option-label="display_name"
        @item-select="selectAddress"
      />
      <label for="address" class="label">Adresse</label>
    </FloatLabel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { debounce } from '../utils/Debounce';
import { NominatimResponseItem } from '@/types/Address.ts';
import { AutoCompleteItemSelectEvent } from 'primevue/autocomplete';

const addressValue = ref('');
const addresses = ref<NominatimResponseItem[]>([]);

const emit = defineEmits(['address']);

const searchAddresses = async () => {
  if (!addressValue.value) return;
  const response = await axios.get<NominatimResponseItem[]>(
    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ch&q=${encodeURIComponent(addressValue.value)}`
  );
  addresses.value = response.data;
};

const debouncedSearchAddresses = debounce(searchAddresses, 300);

const selectAddress = (event: AutoCompleteItemSelectEvent) => {
  emit('address', event.value);
};
</script>

<style scoped>
.basic-input-area {
  @apply flex-auto w-full;
}

.float-label-input {
  @apply w-full relative;
}

:deep(.p-autocomplete-input) {
  width: 100%;
}
</style>
