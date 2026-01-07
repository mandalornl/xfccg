<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const snackbarState = useSnackbarState();

useHead({
  title: 'Account',
});

const isValidForm = ref<boolean>(true);
const isSaving = ref<boolean>(false);

const fullName = ref<string>(
  user.value?.user_metadata?.app?.full_name
  ?? user.value?.user_metadata?.custom_claims?.global_name
  ?? user.value?.user_metadata?.full_name
);

const updateUser = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSaving.value = true;

  const { error } = await supabase.auth.updateUser({
    data: {
      app: {
        full_name: fullName.value,
      },
    },
  });

  await supabase.auth.refreshSession();

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
  <layout-content>
    <v-form
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="updateUser"
    >
      <v-card
        title="Account"
        variant="flat"
      >
        <v-card-text class="text-body-1">
          <input-string
            v-model="fullName"
            :rules="[ (v) => !!v || 'Enter your name' ]"
            label="Name"
          />
          <input-email
            v-model="email"
            :rules="[ (v) => !!v || 'Enter your email' ]"
            disabled
            label="Email"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="isValidForm === false"
            :loading="isSaving"
            variant="flat"
            color="primary"
            text="Save"
            type="submit"
          />
        </v-card-actions>
      </v-card>
    </v-form>
    <v-divider class="my-6" />
    <change-password-dialog />
  </layout-content>
</template>
