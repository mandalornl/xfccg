<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const snackbarState = useSnackbarState();

definePageMeta({
  middleware: [
    'authenticated',
  ],
});

const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);

const name = ref<string>(user.value?.user_metadata.full_name);
const email = ref<string>(user.value?.email || '');

const updateUser = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSaving.value = true;

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name.value,
    },
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred saving your account.');
  } else {
    snackbarState.success('Your account has been saved.');
  }

  setTimeout(() => {
    isSaving.value = false;
  }, 200);
};
</script>

<template>
  <layout-content title="Account">
    <v-form
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="updateUser"
    >
      <input-string
        v-model="name"
        :rules="[ (v) => !!v || 'Enter your name' ]"
        label="Name"
      />
      <input-email
        v-model="email"
        :rules="[ (v) => !!v || 'Enter your email' ]"
        disabled
        label="Email"
      />
      <v-btn
        :disabled="isValidForm === false"
        :loading="isSaving"
        variant="flat"
        color="primary"
        text="Save"
        type="submit"
      />
    </v-form>
    <v-divider class="my-6" />
    <change-password />
  </layout-content>
</template>