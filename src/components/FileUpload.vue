<template>
  <div class="file-upload-container mb-5 -mt-5">
    <p class="mb-2">
      Bitte laden Sie eine Datei hoch, die Ihre Eigentümerschaft bestätigt.
    </p>
    <input
      type="file"
      id="file-upload"
      @change="handleFileSelect"
      style="display: none"
    />
    <label
      for="file-upload"
      class="inline-block px-4 py-2 bg-primaryRed font-bold text-white text-base leading-tight rounded shadow-md hover:bg-secondaryRed hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer vertical-align-middle"
    >
      <span class="plus">+</span> File wählen
    </label>
    <div
      v-if="fileTooLarge"
      class="error-message mt-5 bg-red-100 border border-primaryRed text-primaryRed px-4 py-3 rounded relative"
    >
      File ist zu gross, es sollte kleiner als {{ readableMaxSize }} sein.
    </div>
    <div
      v-if="selectedFile"
      class="file-details mt-5 bg-[#d5f5d6] border border-[#3c573d] text-[#3c573d] px-4 py-3 rounded relative"
    >
      Ausgewählte Datei: {{ selectedFile.name }} ({{
        getFileSize(selectedFile.size)
      }})
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const MAX_SIZE = 2 * 1024 * 1024; // Max file size in bytes (2MB)
const selectedFile = ref<File | null>(null);
const fileTooLarge = ref(false);
const emit = defineEmits(['file']);

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    const file = input.files[0];
    if (file.size > MAX_SIZE) {
      fileTooLarge.value = true;
      selectedFile.value = null;
    } else {
      fileTooLarge.value = false;
      selectedFile.value = file;
      emit('file', selectedFile.value);
    }
  }
}

function getFileSize(size: number): string {
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

const readableMaxSize = computed(
  () => `${(MAX_SIZE / 1024 / 1024).toFixed(2)} MB`
);
</script>

<style scoped>
.error-message {
  color: #bb4446;
}

.plus {
  font-size: 24px;
  vertical-align: middle;
}
</style>
