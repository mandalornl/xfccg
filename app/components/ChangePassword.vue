<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';
import type { VForm } from 'vuetify/components';

const supabase = useSupabaseClient();
const snackbarState = useSnackbarState();

const formRef = useTemplateRef<VForm>('form');
const isValidForm = ref<boolean>(true);
const isUpdating = ref<boolean>(false);

const isOpen = ref<boolean>(false);
const currentPassword = ref<string>('');
const newPassword = ref<string>('');

watch(isOpen, (value) => {
  if (value) {
    return;
  }

  formRef.value?.reset();
});

const updateUser = async (event: SubmitEventPromise) => {
  snackbarState.reset();

  const { valid } = await event;

  if (!valid) {
    return;
  }

  isUpdating.value = true;

  const { error } = await supabase.auth.updateUser({
    password: newPassword.value,
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred updating your password.');
  } else {
    snackbarState.success('Your password has been updated.');

    isOpen.value = false;
  }

  setTimeout(() => {
    isUpdating.value = false;
  }, 200);
};
</script>

<template>
  <v-dialog
    v-model="isOpen"
    persistent
    width="500"
  >
    <template #activator="{ props }">
      <v-btn
        text="Change Password"
        variant="flat"
        color="primary"
        v-bind="props"
      />
    </template>
    <v-form
      ref="form"
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="updateUser"
    >
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          Update your Password
          <v-btn
            :disabled="isUpdating"
            variant="text"
            size="small"
            icon="mdi-close"
            title="Close"
            @click="isOpen = false"
          />
        </v-card-title>
        <v-card-text class="text-body-1">
          <p>Enter your current password and a new password.</p>
          <input-password
            v-model="currentPassword"
            :rules="[ (v) => !!v || 'Enter your current password' ]"
            autocomplete="current-password"
            label="Current Password"
          />
          <input-password
            v-model="newPassword"
            :rules="[ (v) => !!v || 'Enter a new password' ]"
            strict-rules
            autocomplete="new-password"
            label="New Password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isUpdating"
            variant="text"
            text="Cancel"
            @click="isOpen = false"
          />
          <v-btn
            :disabled="isValidForm === false"
            :loading="isUpdating"
            variant="flat"
            color="primary"
            text="Save"
            type="submit"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>