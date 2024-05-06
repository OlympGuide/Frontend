<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="props.sportField.name"
    :style="{ width: '25rem' }"
  >
    <span
      v-if="props.sportField.description"
      class="p-text-secondary block mb-5"
      >{{ props.sportField.description }}</span
    >

    <template #footer>
      <Button label="Cancel" text @click="closeDialog()"></Button>
      <Button
        label="Reservieren"
        outlined
        @click="reserve()"
        autofocus
      ></Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { SportField } from '@/types/SportField.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const visible = defineModel('visible', { default: false });

const props = defineProps<{
  sportField: SportField;
}>();

const closeDialog = () => {
  visible.value = false;
};

const reserve = async () => {
  visible.value = false;
  await router.push({ name: 'Reserve', params: { id: props.sportField.id } });
};
</script>

<style lang="scss" scoped>
.formItem {
  @apply flex justify-between items-center;
}
</style>
