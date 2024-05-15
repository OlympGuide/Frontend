<template>
  <div>
    <FloatLabel class="float-label-input font-bold">
      <AutoComplete
        data-cy="address-autocomplete"
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
import { GeoapifyItem, NominatimResponseItem } from '@/types/Address.ts';
import { AutoCompleteItemSelectEvent } from 'primevue/autocomplete';

const addressValue = ref('');
const addresses = ref<NominatimResponseItem[]>([]);

const emit = defineEmits(['address']);

const searchOpenStreetMapAddresses = async () => {
  if (!addressValue.value) return;
  const response = await axios.get<NominatimResponseItem[]>(
    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ch&q=${encodeURIComponent(addressValue.value)}`
  );
  addresses.value = response.data;
};

const searchAddresses = async () => {
  const apiKey = 'c2c78780d2e548ab8425009edbd78023';

  if (!addressValue.value) return;
  try {
    const res = await axios.get<{ results: GeoapifyItem[] }>(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(addressValue.value)}&lang=de&limit=10&filter=countrycode:ch&format=json&apiKey=${apiKey}`
    );

    addresses.value = res.data.results.map((item) => {
      return {
        display_name: item.formatted,
        lat: item.lat.toString(),
        lon: item.lon.toString(),
      };
    });
  } catch (error) {
    await searchOpenStreetMapAddresses();
  }
};

const debouncedSearchAddresses = debounce(searchAddresses, 500);

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
