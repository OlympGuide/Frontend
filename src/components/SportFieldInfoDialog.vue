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

    <div class="flex flex-col gap-y-3">
      <div class="formItem">
        <label for="date">Date</label>
        <Calendar
          v-model="date"
          id="date"
          showIcon
          iconDisplay="input"
          dateFormat="dd.mm.yy"
        />
      </div>

      <div class="formItem">
        <label for="timeFrom">From</label>
        <Calendar
          v-model="timeFrom"
          id="timeFrom"
          showIcon
          iconDisplay="input"
          timeOnly
        >
          <template #inputicon="{ clickCallback }">
            <InputIcon
              class="pi pi-clock cursor-pointer"
              @click="clickCallback"
            />
          </template>
        </Calendar>
      </div>

      <div class="formItem">
        <label for="timeTo">To</label>
        <Calendar
          v-model="timeTo"
          id="timeTo"
          showIcon
          iconDisplay="input"
          timeOnly
        >
          <template #inputicon="{ clickCallback }">
            <InputIcon
              class="pi pi-clock cursor-pointer"
              @click="clickCallback"
            />
          </template>
        </Calendar>
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" text @click="closeDialog()"></Button>
      <Button label="Book" outlined @click="book()" autofocus></Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ShowSportField } from '@/types/Map';
import { ref } from 'vue';

const visible = defineModel('visible', { default: false });
const props = defineProps<{
  sportField: ShowSportField;
}>();

const date = ref<Date>(new Date());
const timeFrom = ref<Date>(new Date());
const timeTo = ref<Date>(new Date());

const closeDialog = () => {
  visible.value = false;
};

const book = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.formItem {
  @apply flex justify-between items-center;
}
</style>
