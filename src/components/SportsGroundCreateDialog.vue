<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-3/6"
    @hide="closeDialog"
    @show="resetForm"
    ><form @submit.prevent="submitDialog" novalidate>
      <div class="flex flex-col gap-y-10 lg:gap-y-10 pt-5">
        <div class="text-red-300" v-if="errorMessage.length > 0">
          {{ errorMessage }}
        </div>
        <div class="flex flex-col xl:flex-row gap-y-10 gap-5">
          <FloatLabel class="w-full relative">
            <label for="name" class="font-semibold w-full">Name</label>
            <InputText
              id="name"
              class="flex-auto w-full"
              :class="{ 'p-invalid': nameError }"
              v-model="name"
              autocomplete="off"
            />
            <small class="p-error input-error">{{ nameError }}</small>
          </FloatLabel>

          <FloatLabel class="w-full relative">
            <label for="coordinates" class="font-semibold w-full"
              >Koordinaten</label
            >
            <InputText
              id="coordinates"
              class="flex-auto w-full"
              :class="{ 'p-invalid': coordinatesError }"
              v-model="coordinates"
              autocomplete="off"
            />
            <small class="p-error input-error">{{ coordinatesError }}</small>
          </FloatLabel>
        </div>

        <FloatLabel class="w-full mb-5 relative">
          <label for="description" class="font-semibold w-full"
            >Beschreibung</label
          >
          <TextArea
            id="description"
            class="flex-auto w-full h-40"
            :class="{ 'p-invalid': descriptionError }"
            v-model="description"
            autocomplete="off"
          />
        </FloatLabel>
      </div>
      <div class="flex justify-content-end gap-2">
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
import { ref, watch } from "vue";
import { useField, useForm } from "vee-validate";
import { CreateSportFieldRequest } from "@/types/CreateSportFieldRequest.ts";
import { storeToRefs } from "pinia";
import { useSportsGroundStore } from "@/stores/SportsGroundStore.ts";

const { handleSubmit, validate, resetForm } = useForm({
  initialValues: {
    name: "",
    coordinates: "",
    description: "",
  },
  validateOnMount: false,
});

const { value: name, errorMessage: nameError } = useField<string>(
  "name",
  "required",
);

const { value: coordinates, errorMessage: coordinatesError } = useField<string>(
  "coordinates",
  "required|coordinatePair",
);

const { value: description, errorMessage: descriptionError } =
  useField<string>("description");

const sportsGroundStore = useSportsGroundStore();
const { isLoading, errorMessage } = storeToRefs(sportsGroundStore);

const props = defineProps({
  isVisible: { type: Boolean, required: true },
});

const emit = defineEmits(["close"]);

const visible = ref(props.isVisible);

watch(
  () => props.isVisible,
  (value) => {
    visible.value = value;
  },
);

const closeDialog = () => {
  errorMessage.value = "";
  emit("close");
};

const submitDialog = handleSubmit(async (values: any) => {
  const validation = await validate();

  if (!validation.valid) {
    return;
  }

  const [latitude, longitude] = values.coordinates.split(/\s*,\s*/);

  const creatSportField: CreateSportFieldRequest = {
    name: values.name,
    description: values.description,
    longitude: longitude,
    latitude: latitude,
  };

  try {
    await sportsGroundStore.createNewSportsFieldRequest(creatSportField);
    resetForm();
    closeDialog();
  } catch (e: any) {
    console.log(e);
  }
});
</script>

<style scoped></style>
