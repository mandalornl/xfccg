<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const snackbar = useSnackbarState();

definePageMeta({
  middleware: [
    'authenticated',
  ],
});

const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);

const displayName = ref<string>(user.value?.user_metadata.display_name);
const email = ref<string>(user.value?.email || '');

const updateUser = async (event: SubmitEventPromise) => {
  snackbar.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSaving.value = true;

  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: displayName.value,
    },
  });

  if (error) {
    useDebug(error);

    snackbar.error('An error occurred saving your account.');
  } else {
    snackbar.success('Your account has been saved.');
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
        v-model="displayName"
        :rules="[ (v) => !!v || 'Enter your name' ]"
        label="Name"
      />
      <input-email
        v-model="email"
        :rules="[ (v) => !!v || 'Enter your email' ]"
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
    <h3 class="text-h6 mb-3">
      Password and Authentication
    </h3>
    <update-password-dialog />
  </layout-content>
</template>