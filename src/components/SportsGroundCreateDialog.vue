<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-3/6"
    @hide="closeDialog"
    @show="resetForm"
  >
    <form @submit.prevent="submitDialog" novalidate>
      <div class="flex-col flex gap-y-10 lg:gap-y-10 pt-5">
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
            <small
              class="p-error absolute left-0 bottom-0 -mb-5 ml-2 text-xs"
              >{{ nameError }}</small
            >
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
            <small
              class="p-error absolute left-0 bottom-0 -mb-5 ml-2 text-xs"
              >{{ coordinatesError }}</small
            >
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
          <small class="p-error absolute left-0 bottom-0 -mb-3 ml-2 text-xs">{{
            descriptionError
          }}</small>
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
import { postSportsGroundData } from "@/api/sportsGroundApi.ts";
import { useField, useForm } from "vee-validate";

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

const { value: description, errorMessage: descriptionError } = useField<string>(
  "description",
  "required",
);

//const name = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

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
  console.log("close Dialog");
  emit("close");
};

const submitDialog = handleSubmit(async (values: any) => {
  const validation = await validate();

  if (!validation.valid) {
    return;
  }

  const [latitude, longitude] = values.coordinates.split(/\s*,\s*/);

  const creatSportField: CreateSportFieldRequestDTO = {
    name: values.name,
    description: values.description,
    longitude: longitude,
    latitude: latitude,
  };

  try {
    isLoading.value = true;
    errorMessage.value = "";
    await postSportsGroundData(creatSportField);
    resetForm();
    closeDialog();
  } catch (e: any) {
    console.log("Error while creating new sports ground: ", e);
    errorMessage.value = "Es gab ein Problem beim Übermitteln der Daten";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
