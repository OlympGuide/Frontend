<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-3/6 min-w-[600px]"
    @hide="closeDialog"
    :draggable="false"
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
            <small data-cy="name-error" class="p-error input-error">{{
              nameError
            }}</small>
          </FloatLabel>

          <FloatLabel class="float-label-input">
            <Dropdown
              v-model="category"
              :options="sportFieldCategories"
              option-label="name"
              class="w-full"
              :class="{ 'p-invalid': categoryError }"
            ></Dropdown>
            <label for="description" class="label"
              >Kategorie <span class="text-red-800">*</span></label
            >
            <small class="p-error input-error">{{ categoryError }}</small>
          </FloatLabel>
        </div>
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
          <small class="p-error input-error" class="p-error input-error">{{ coordinatesError }}</small>
        </FloatLabel>
        <AddressCompletion @address="setCoordinates"  v-model="addressInput"
                           :error="addressInputError"/>
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
        <!--        <div class="flex align-items-center" v-if="!isDemoActive">-->
        <!--          <Checkbox v-model="checked" :binary="true" id="owner" class="mb-5" />-->
        <!--          <label @click="checked = !checked" class="ml-2 clickable"-->
        <!--            >Ich bin Eigentümer:in</label-->
        <!--          >-->
        <!--        </div>-->
        <!--        <div v-if="checked">-->
        <!--          <FileUpload @file="handleFile" />-->
        <!--        </div>-->
      </div>
      <div class="button-layout">
        <Button
          type="button"
          label="Verwerfen"
          severity="secondary"
          data-cy="verwerfen-button"
          @click="closeDialog"
        ></Button>
        <Button
          type="submit"
          label="Speichern"
          data-cy="speichern-button"
          class="!bg-primaryRed"
          :loading="isLoading"
        ></Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import AddressCompletion from '@/components/AddressCompletion.vue';
import { NominatimResponseItem } from '@/types/Address.ts';
// import FileUpload from '@/components/FileUpload.vue';
// import { useDemoStore } from '@/stores/DemoStore.ts';
import { useSportFieldProposalStore } from '@/stores/SportFieldProposalStore.ts';
import { PostSportFieldProposal } from '@/types/Proposal';
import { sportFieldCategories } from '@/types/SportField.ts';
import { useToast } from 'primevue/usetoast';

// const checked = ref(false);
const address = ref<NominatimResponseItem>();
// const file = ref<File>();

// const demoStore = useDemoStore();
// const { isDemoActive } = storeToRefs(demoStore);

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
    category: undefined,
    coordinates: props.coordinates ?? '',
    description: '',
    addressInput: '',
  },
  validateOnMount: false,
});

const { value: name, errorMessage: nameError } = useField<string>(
  'name',
  'required'
);

const { value: category, errorMessage: categoryError } = useField<string>(
  'category',
  'requiredDropdown'
);

const { value: addressInput, errorMessage: addressInputError } =
  useField<string>('addressInput', (value) => {
    if (!coordinates.value && !value) {
      return 'Die Adresse darf nicht leer sein, wenn kein Pin gesetzt wurde';
    }

    return true;
  });

const { value: coordinates, errorMessage: coordinatesError } = useField<string>(
  'coordinates',
  'required|coordinatePair'
);

const { value: description, errorMessage: descriptionError } =
  useField<string>('description');

const sportFieldProposalStore = useSportFieldProposalStore();
const { isLoading, errorMessage } = storeToRefs(sportFieldProposalStore);

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
    // @ts-ignore-next-line
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

// const handleFile = (ownerFile: File) => {
//   file.value = ownerFile;
// };

const toast = useToast();

const submitDialog = handleSubmit(async (values: any) => {
  const validation = await validate();

  if (!validation.valid) {
    return;
  }

  const [latitude, longitude] = values.coordinates.split(/\s*,\s*/);

  const sportFieldProposal: PostSportFieldProposal = {
    sportFieldName: values.name,
    sportFieldCategory: values.category.category,
    sportFieldDescription: values.description,
    sportFieldLongitude: longitude,
    sportFieldLatitude: latitude,
    sportFieldAddress: address.value?.display_name,
    //sportFieldFile: file.value, //TODO add again after backend accepts files
  };

  try {
    await sportFieldProposalStore.createSportFieldProposal(sportFieldProposal);
    resetForm();
    closeDialog();
    toast.add({
      severity: 'success',
      summary: 'Sportplatz Anfrage erstellt',
      detail: `${sportFieldProposal.sportFieldName}`,
      life: 3000,
    });
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
  @apply flex gap-2 mt-4;
}

.switch-row-col-layout {
  @apply flex flex-col xl:flex-row gap-y-10 gap-5;
}

.col-layout {
  @apply flex flex-col gap-y-10 lg:gap-y-10 pt-5;
}

/*.clickable {
  @apply cursor-pointer;
}*/
</style>
