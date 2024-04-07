<template>
  <div class="card flex flex-col justify-content-center -mt-10 mb-10">
    <Toast />
    <p class="mb-2">
      Bitte laden Sie eine Datei hoch, die Ihre Eigentümerschaft bestätigt.
    </p>
    <FileUpload
      mode="advanced"
      name="demo[]"
      accept=".zip,.pdf"
      invalidFileSizeMessage="File ist zu gross, es sollte kleiner als 2MB sein"
      :auto="false"
      :show-cancel-button="false"
      :show-upload-button="false"
      :maxFileSize="2097152"
      @select="onSelect"
      @remove="onRemove"
    >
      <template #empty>
        <div class="flex justify-center">
        <p >Ziehen Sie Dateien hierher, um sie hochzuladen.</p>
        </div>
      </template>
    </FileUpload>
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

<style scoped>

</style>
