<template>
  <div class="page-container-placement z-[1000] w-4/6">
    <p class="page-title pb-10">Login</p>
    <form @submit.prevent="submitLogin" novalidate>
      <div class="flex flex-col gap-y-10 gap-5">
        <FloatLabel class="w-full relative">
          <label for="email" class="font-semibold w-full">Email</label>
          <InputText
            id="name"
            class="flex-auto w-full"
            :class="{ 'p-invalid': emailError }"
            v-model="email"
            autocomplete="off"
          />
          <small class="p-error input-error">{{ emailError }}</small>
        </FloatLabel>
        <FloatLabel class="w-full relative">
          <label for="password" class="font-semibold w-full">Passwort</label>
          <InputText
            id="password"
            class="flex-auto w-full"
            :class="{ 'p-invalid': passwordError }"
            v-model="password"
            autocomplete="off"
          />
          <small class="p-error input-error">{{ passwordError }}</small>
        </FloatLabel>
        <Button class="w-[130px] button-text-center">Einloggen</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';

const {} = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validateOnMount: false,
});

const { value: email, errorMessage: emailError } = useField<string>('email');

const { value: password, errorMessage: passwordError } =
  useField<string>('password');

const submitLogin = () => {};
</script>

<style scoped></style>
