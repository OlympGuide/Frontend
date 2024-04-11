<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-3/6"
    @hide="closeDialog"
  >
    <form @submit.prevent="submitDialog" novalidate>
      <div class="col-layout">
        <div class="text-red-300" v-if="errorMessage.length > 0">
          {{ errorMessage }}
        </div>
        <div class="switch-row-col-layout">
          <FloatLabel class="float-label-input">
            <label for="name" class="label"
              >Name <span class="text-red-800">*</span></label
            >
            <InputText
              id="name"
              class="basic-input-area"
              :class="{ 'p-invalid': nameError }"
              v-model="name"
              autocomplete="off"
            />
            <small class="p-error input-error">{{ nameError }}</small>
          </FloatLabel>

          <FloatLabel class="float-label-input">
            <label for="coordinates" class="label"
              >Koordinaten <span class="text-red-800">*</span></label
            >
            <InputText
              disabled
              id="coordinates"
              class="basic-input-area"
              :class="{ 'p-invalid': coordinatesError }"
              v-model="coordinates"
              autocomplete="off"
            />
            <small class="p-error input-error">{{ coordinatesError }}</small>
          </FloatLabel>
        </div>
        <AddressCompletion @address="setCoordinates" />
        <FloatLabel class="float-label-input">
          <label for="description" class="label">Beschreibung</label>
          <TextArea
            id="description"
            class="basic-input-area h-40"
            :class="{ 'p-invalid': descriptionError }"
            v-model="description"
            autocomplete="off"
          />
        </FloatLabel>
        <div class="flex align-items-center">
          <Checkbox v-model="checked" :binary="true" id="owner" class="mb-5" />
          <label @click="checked = !checked" class="ml-2 clickable"
            >Ich bin Eigentümer:in</label
          >
        </div>
        <div v-if="checked">
          <SportFieldOwnerDialog @file="handleFile" />
        </div>
      </div>
      <div class="button-layout">
        <Button
          type="button"
          label="Verwerfen"
          severity="secondary"
          @click="closeDialog"
        ></Button>
        <Button type="submit" label="Speichern" :loading="isLoading"></Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import SportFieldOwnerDialog from '@/components/SportFieldOwnerDialog.vue';
import AddressCompletion from '@/components/AddressCompletion.vue';
import { NominatimResponseItem } from '@/types/Address.ts';

const checked = ref(false);
import { useSportFieldProposalStore } from '@/stores/SportFieldProposalStore.ts';
import { PostSportFieldProposal } from '@/types/Proposal';
const address = ref<NominatimResponseItem>();
const file = ref<File>();

const props = defineProps({
  isVisible: { type: Boolean, required: true },
  coordinates: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['close']);

const { handleSubmit, validate, resetForm } = useForm({
  initialValues: {
    name: '',
    coordinates: props.coordinates ?? '',
    description: '',
  },
  validateOnMount: false,
});

const { value: name, errorMessage: nameError } = useField<string>(
  'name',
  'required'
);

const { value: coordinates, errorMessage: coordinatesError } = useField<string>(
  'coordinates',
  'required|coordinatePair'
);

const { value: description, errorMessage: descriptionError } =
  useField<string>('description');

const sportFieldProposalStore = useSportFieldProposalStore();
const { isLoading, errorMessage } = storeToRefs(sportFieldProposalStore);

const props = defineProps({
  isVisible: { type: Boolean, required: true },
});

const emit = defineEmits(['close']);

const visible = ref(props.isVisible);

watch(
  () => props.isVisible,
  (value) => {
    visible.value = value;
  }
);

watch(
  () => props.coordinates,
  (value) => {
    if (typeof value === 'string') {
      coordinates.value = value;
    }
  }
);

const closeDialog = () => {
  errorMessage.value = '';
  resetForm();
  emit('close');
};

const setCoordinates = (autocompleteAddress: NominatimResponseItem) => {
  address.value = autocompleteAddress;
  coordinates.value = autocompleteAddress.lat + ', ' + autocompleteAddress.lon;
};

const handleFile = (ownerFile: File) => {
  file.value = ownerFile;
};

const submitDialog = handleSubmit(async (values: any) => {
  const validation = await validate();

  if (!validation.valid) {
    return;
  }

  const [latitude, longitude] = values.coordinates.split(/\s*,\s*/);

  const sportFieldProposal: PostSportFieldProposal = {
    sportFieldName: values.name,
    sportFieldDescription: values.description,
    sportFieldLongitude: longitude,
    sportFieldLatitude: latitude,
    sportFieldAddress: address.value?.display_name,
    file: file.value,
  };

  try {
    await sportFieldProposalStore.createSportFieldProposal(sportFieldProposal);
    resetForm();
    closeDialog();
  } catch (e: any) {
    console.error(e);
  }
});
</script>

<style scoped>
.float-label-input {
  @apply w-full relative;
}

.label {
  @apply font-semibold w-full;
}

.basic-input-area {
  @apply flex-auto w-full;
}

.button-layout {
  @apply flex gap-2;
}

.switch-row-col-layout {
  @apply flex flex-col xl:flex-row gap-y-10 gap-5;
}

.col-layout {
  @apply flex flex-col gap-y-10 lg:gap-y-10 pt-5;
}

.clickable {
  @apply cursor-pointer;
}
</style>
