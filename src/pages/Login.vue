<template>
  <Dialog
    modal
    header="Login"
    class="z-[1000] border-2 w-4/5 md:w-3/5 lg:w-3/6"
    v-model:visible="visible"
  >
    <FloatLabel class="w-full relative">
      <label for="name" class="font-semibold w-full"
      >Name <span class="text-red-800">*</span></label
      >
      <InputText
          id="name"
          class="flex-auto w-full"
          :class="{ 'p-invalid': emailError }"
          v-model="email"
          autocomplete="off"
      />
      <small class="p-error input-error">{{ emailError }}</small>
    </FloatLabel>
  </Dialog>
</template>

<script setup lang="ts">
import OlympMap from "@/components/OlympMap.vue";
import {useField, useForm} from "vee-validate";
const { handleSubmit, validate, resetForm } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validateOnMount: false,
});

const { value: email, errorMessage: emailError } = useField<string>(
    'email',
    'required'
);

const visible = true;

</script>

<style scoped></style>
