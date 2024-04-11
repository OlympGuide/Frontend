<template>
  <div class="card flex flex-col justify-content-center -mt-10 mb-10">
    <p class="mb-2">
      Bitte laden Sie eine Datei hoch, die Ihre Eigentümerschaft bestätigt.
    </p>
    <FileUpload
      mode="advanced"
      name="files[]"
      accept="application/zip, application/x-zip, application/pdf"
      invalid-file-size-message="File ist zu gross, es sollte kleiner als 2MB sein"
      choose-label="File wählen"
      :preview-width="0"
      :file-limit="1"
      :auto="false"
      :show-cancel-button="false"
      :show-upload-button="false"
      :maxFileSize="2097152"
      @select="onSelect"
      @remove="onRemove"
    >
      <template #empty>
        <div class="flex justify-center">
          <p>Ziehen Sie Ihre Datei hierher, um sie hochzuladen.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFiles = ref<File[]>([]);
const emit = defineEmits(['file']);

function onSelect(event: { files: File[] }) {
  selectedFiles.value = event.files;
  emit('file', selectedFiles.value[0]);
}

function onRemove(event: { file: File }) {
  selectedFiles.value = selectedFiles.value.filter(
    (file) => file.name !== event.file.name
  );
}
</script>

<style scoped></style>
