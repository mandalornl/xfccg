<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify';

const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();
const snackbarState = useSnackbarState();

useHead({
  title: 'Register',
});

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const isValidForm = ref<boolean>(true);
const isRegistering = ref<boolean>(false);
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const register = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isRegistering.value = true;

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${runtimeConfig.public.baseUrl}/confirm`,
      data: {
        app: {
          full_name: name.value,
        },
      },
    },
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred during registration.');
  } else {
    snackbarState.success('A confirmation email has been sent. Your account will be created once you confirm it.');

    await navigateTo({
      name: 'login',
      query: {
        email: encodeURIComponent(email.value),
      },
    });
  }

  setTimeout(() => {
    isRegistering.value = false;
  }, 200);
};
</script>

<template>
  <layout-content
    title="Get started"
    size="small"
  >
    <p>Create a new account.</p>
    <v-form
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="register"
    >
      <input-string
        v-model="name"
        :rules="[ (v) => !!v || 'Enter your name' ]"
        label="Name"
      />
      <input-email
        v-model="email"
        :rules="[ (v) => !!v || 'Enter your email' ]"
        label="Email"
      />
      <input-password
        v-model="password"
        :rules="[ (v) => !!v || 'Enter a password' ]"
        strict-rules
        autocomplete="new-password"
        label="Password"
      />
      <v-btn
        :disabled="isValidForm === false"
        :loading="isRegistering"
        block
        color="primary"
        variant="flat"
        size="large"
        text="Sign up"
        type="submit"
      />
    </v-form>
  </layout-content>
</template>
