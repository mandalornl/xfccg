<script lang="ts" setup>
const supabase = useSupabaseClient();
const snackbar = useSnackbarState();

const open = ref<boolean>(false);
const currentStep = ref<string>('confirm');
const isLoading = ref<boolean>(false);
const otpInputRef = useTemplateRef('otpInput');

const listFactors = async () => {
  const {
    data,
    error,
  } = await supabase.auth.mfa.listFactors();

  if (error) {
    throw error;
  }

  return data;
};

const challengeAndVerify = async (factorId: string, code: string) => {
  const { error } = await supabase.auth.mfa.challengeAndVerify({
    factorId,
    code,
  });

  if (error) {
    throw error;
  }
};

const unenroll = async (factorId: string) => {
  const { error } = await supabase.auth.mfa.unenroll({
    factorId,
  });

  if (error) {
    throw error;
  }
};

const verifyAndUnenroll = async (code: string) => {
  snackbar.reset();

  isLoading.value = true;

  try {
    const factors = await listFactors();

    const factor = factors.totp[0];

    await challengeAndVerify(factor.id, code);
    await unenroll(factor.id);
  } catch (error) {
    useDebug(error);

    otpInputRef.value?.reset();

    snackbar.error('An error occurred while removing your authenticator app.');
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};

watch(open, (value) => {
  if (value) {
    return;
  }

  currentStep.value = 'confirm';
});
</script>

<template>
    <v-dialog
      v-model="open"
      width="500"
    >
      <template #activator="{ props }">
        <v-btn
          variant="tonal"
          color="error"
          text="Remove Authenticator App"
          v-bind="props"
        />
      </template>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          Remove Authenticator App
          <v-btn
            variant="text"
            size="small"
            icon="mdi-close"
            title="Close"
            @click="open = false"
          />
        </v-card-title>
        <v-card-text class="text-body-1">
          <v-window v-model="currentStep">
            <v-window-item value="confirm">
              Are you sure you want to remove your Authenticator App?
            </v-window-item>
            <v-window-item value="verify">
              <p>Enter the 6-digit verification code generated.</p>
              <v-otp-input
                ref="otpInput"
                :loading="isLoading"
                type="number"
                length="6"
                @finish="verifyAndUnenroll"
              />
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isLoading"
            variant="text"
            text="Cancel"
            @click="open = false"
          />
          <v-btn
            v-if="currentStep !== 'verify'"
            variant="flat"
            color="primary"
            text="Ok"
            @click="currentStep = 'verify'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>