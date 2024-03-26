<template>
  <Dialog v-model:visible="visible" @hide="closeDialog" modal header="Edit Profile" class="z-[1000] border-2"
          :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Neuer Sportplatz erstellen</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="name" class="font-semibold w-6rem">Name</label>
      <InputText id="name" class="flex-auto" autocomplete="off"/>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="description" class="font-semibold w-6rem">Beschreibung</label>
      <InputText id="description" class="flex-auto" autocomplete="off"/>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="coordinates" class="font-semibold w-6rem">Koordinaten</label>
      <InputText id="coordinates" class="flex-auto" autocomplete="off"/>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="closeDialog"></Button>
      <Button type="button" label="Save" @click="closeDialog"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const props = defineProps({
  isVisible: {type: Boolean, required: true}
})

const emit = defineEmits(["close"])

const visible = ref(props.isVisible)
watch(() => props.isVisible, (value) => {
  visible.value = value
})

const closeDialog = () => {

  console.log("close Dialog")
  emit("close")
}
</script>

<style scoped>

</style>


