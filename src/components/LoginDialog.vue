<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Login"
    :draggable="false"
    class="w-96"
    @hide="() => $emit('close')"
  >
    <form @submit.prevent="submitLogin" novalidate>
      <div class="flex flex-col gap-5">
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
        <div>
          <small>
            Ich habe noch kein Profil.
            <a @click="" class="text-primaryRed cursor-pointer">Registrieren</a>
          </small>
        </div>
        <Button type="submit" class="w-[130px] button-text-center"
          >Einloggen</Button
        >
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useUserStore } from '@/stores/UserStore.ts';

const userStore = useUserStore();

const visible = defineModel('visible', { default: false });

const { handleSubmit, validate } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validateOnMount: false,
});

const { value: email, errorMessage: emailError } = useField<string>(
  'email',
  'required|email'
);

const { value: password, errorMessage: passwordError } = useField<string>(
  'password',
  'required|password'
);

const submitLogin = handleSubmit(async (credentials: any) => {
  const validation = await validate();

  if (!validation.valid) {
    return;
  }

  await userStore.login(credentials);
});
</script>

<style scoped></style>
