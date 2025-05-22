<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const supabase = useSupabaseClient();

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const isValidForm = ref<boolean>(true);
const isRegistering = ref<boolean>(false);
const displayName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const register = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  isRegistering.value = true;

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        display_name: displayName.value,
      },
    },
  });

  if (error) {
    useDebug(error);
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
        v-model="displayName"
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
        :rules="[ (v) => !!v || 'Enter your password' ]"
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