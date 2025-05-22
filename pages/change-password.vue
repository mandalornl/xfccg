<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const supabase = useSupabaseClient();

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const isValidForm = ref<boolean>(true);
const isUpdating = ref<boolean>(false);
const password = ref<string>('');

const updatePassword = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  isUpdating.value = true;

  const { error } = await supabase.auth.updateUser({
    password: password.value,
  });

  if (error) {
    useDebug(error);
  }

  setTimeout(() => {
    isUpdating.value = false;
  }, 200);
}
</script>

<template>
  <layout-content
    title="Change password"
    size="small"
  >
    <v-form
      v-model="isValidForm"
      validate-on="lazy"
      @submit.prevent="updatePassword"
    >
      <input-password
        v-model="password"
        :rules="[ (v) => !!v || 'Enter your password' ]"
        strict-rules
        autocomplete="new-password"
        label="Password"
      />
      <v-btn
        :disabled="isValidForm === false"
        :loading="isUpdating"
        block
        variant="flat"
        color="primary"
        size="large"
        text="Update password"
        type="submit"
      />
    </v-form>
  </layout-content>
</template>