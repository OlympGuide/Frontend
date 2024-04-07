<template>
  <div class="card flex flex-col justify-content-center -mt-10 mb-10">
    <Toast />
    <p class="mb-2">
      Bitte laden Sie eine Datei hoch, die Ihre Eigentümerschaft bestätigt.
    </p>
    <FileUpload
      mode="basic"
      name="demo[]"
      accept=".zip,.pdf"
      :maxFileSize="2097152"
      invalidFileSizeMessage="File ist zu gross, es sollte kleiner als 2MB sein"
      @select="onSelect"
      @remove="onRemove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFiles = ref<File[]>([]);

function onSelect(event: { files: File[] }) {
  selectedFiles.value = event.files;
}

function onRemove(event: { file: File }) {
  selectedFiles.value = selectedFiles.value.filter(
    (file) => file.name !== event.file.name
  );
}
</script>

<style scoped></style>
