<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Erstelle einen neuen Sportplatz"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-1/3"
    @hide="closeDialog"
    @show="resetDialog"
  >
    <div class="flex-col flex gap-y-5 pt-5">
      <div class="text-red-300" v-if="errorMessage.length > 0">
        {{ errorMessage }}
      </div>
      <div class="flex flex-col lg:flex-row gap-2">
        <div class="flex align-items-center gap-3 mb-3">
          <FloatLabel>
            <label for="name" class="font-semibold w-6rem">Name</label>
            <InputText
              id="name"
              class="flex-auto"
              v-model="name"
              autocomplete="off"
            />
          </FloatLabel>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <FloatLabel>
            <label for="coordinates" class="font-semibold w-6rem"
              >Koordinaten</label
            >
            <InputText
              id="coordinates"
              class="flex-auto"
              v-model="coordinates"
              autocomplete="off"
            />
          </FloatLabel>
        </div>
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <FloatLabel>
          <label for="description" class="font-semibold w-6rem"
            >Beschreibung</label
          >
          <InputText
            id="description"
            class="flex-auto"
            v-model="description"
            autocomplete="off"
          />
        </FloatLabel>
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="closeDialog"
      ></Button>
      <Button
        type="button"
        label="Save"
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

const submitDialog = async () => {
  const testObject = {
    name: name.value,
    description: description.value,
    coordinates: coordinates.value,
  };

  try {
    isLoading.value = true;
    errorMessage.value = "";
    await postSportsGroundData(testObject);
    closeDialog();
  } catch (e: any) {
    console.log("Error while creating new sports ground: ", e);
    errorMessage.value = "Error while creating new sports ground";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
