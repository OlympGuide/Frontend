<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-1/3"
    @hide="closeDialog"
    @show="resetDialog"
  >
    <div class="flex-col flex gap-3 lg:gap-y-5 pt-5">
      <div class="text-red-300" v-if="errorMessage.length > 0">
        {{ errorMessage }}
      </div>
      <div class="flex flex-col xl:flex-row gap-5">
        <div class="flex align-items-center gap-3 mb-5 w-full">
          <FloatLabel class="w-full">
            <label for="name" class="font-semibold w-full">Name</label>
            <InputText
              id="name"
              class="flex-auto w-full"
              v-model="name"
              autocomplete="off"
            />
          </FloatLabel>
        </div>
        <div class="flex align-items-center gap-3 mb-5 w-full">
          <FloatLabel class="w-full">
            <label for="coordinates" class="font-semibold w-full"
              >Koordinaten</label
            >
            <InputText
              id="coordinates"
              class="flex-auto w-full"
              v-model="coordinates"
              autocomplete="off"
            />
          </FloatLabel>
        </div>
      </div>
      <div class="flex align-items-center gap-3 mb-5 w-full">
        <FloatLabel class="w-full">
          <label for="description" class="font-semibold w-full"
            >Beschreibung</label
          >
          <TextArea
            id="description"
            class="flex-auto w-full h-40"
            v-model="description"
            autocomplete="off"
          />
        </FloatLabel>
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Verwerfen"
        severity="secondary"
        @click="closeDialog"
      ></Button>
      <Button
        type="button"
        label="Speichern"
        :loading="isLoading"
        @click="submitDialog"
      ></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { postSportsGroundData } from "@/api/sportsGroundApi.ts";

const name = ref("");
const coordinates = ref("");
const description = ref("");
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

const resetDialog = () => {
  name.value = "";
  coordinates.value = "";
  description.value = "";
  errorMessage.value = "";
};

const coordinateRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
const isCoordinate = (coordinateString: string): boolean => {
  return coordinateRegex.test(coordinateString);
};

const submitDialog = async () => {
  if (!isCoordinate(coordinates.value)) {
    errorMessage.value =
      "Ungültiges Koordinatenformat. Bitte verwenden Sie das Format: Breitengrad, Längengrad";

    return;
  }

  const [latitude, longitude] = coordinates.value.split(/\s*,\s*/);

  const creatSportField: CreateSportFieldRequestDTO = {
    name: name.value,
    description: description.value,
    longitude: longitude,
    latitude: latitude,
  };

  try {
    isLoading.value = true;
    errorMessage.value = "";
    await postSportsGroundData(creatSportField);
    closeDialog();
  } catch (e: any) {
    console.log("Error while creating new sports ground: ", e);
    errorMessage.value = "Es gab ein Problem beim Übermitteln der Daten";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
