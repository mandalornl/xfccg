<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const supabase = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();
const snackbarState = useSnackbarState();

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const isValidForm = ref<boolean>(true);
const isSending = ref<boolean>(false);
const email = ref<string>('');

const resetPasswordForEmail = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSending.value = true;

  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${runtimeConfig.public.baseUrl}/change-password`,
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred sending the email to reset your password.');
  } else {
    snackbarState.success('The email to reset your password has been sent.');

    await navigateTo('/', {
      replace: true
    });
  }

  setTimeout(() => {
    isSending.value = false;
  }, 200);
}
</script>

<template>
  <layout-content
    title="Reset your password"
    size="small"
  >
    <p>Type in your email and we'll send you a link to reset your password.</p>
    <v-form
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="resetPasswordForEmail"
    >
      <input-email
        v-model="email"
        :rules="[ (v) => !!v || 'Enter your email' ]"
        label="Email"
      />
      <v-btn
        :disabled="isValidForm === false"
        :loading="isSending"
        block
        variant="flat"
        color="primary"
        size="large"
        text="Send reset email"
        type="submit"
      />
    </v-form>
  </layout-content>
</template>