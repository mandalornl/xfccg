<script lang="ts" setup>
const supabase = useSupabaseClient();
const snackbar = useSnackbarState();

const open = ref<boolean>(false);
const factor = ref<{
  id: string,
  type: 'totp',
  totp: {
    qr_code: string,
    secret: string,
    uri: string,
  },
  friendly_name?: string
} | null>();
const isLoading = ref<boolean>(true);

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

const unenroll = async (factorId: string) => {
  const { error } = await supabase.auth.mfa.unenroll({
    factorId,
  });

  if (error) {
    throw error;
  }
};

const enroll = async () => {
  const {
    data,
    error,
  } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'XFCCG',
  });

  if (error) {
    throw error;
  }

  return data;
};

const getUnverifiedFactor = async () => {
  const factors = await listFactors();

  const [ factor ] = factors.all.filter((factor) => (
    factor.factor_type === 'totp'
    && factor.status === 'unverified'
  ));

  return factor ?? null;
};

const challengeAndVerify = async (factorId: string, code: string) => {
  const { error } = await supabase.auth.mfa.challengeAndVerify({
    factorId,
    code
  });

  if (error) {
    throw error;
  }
};

const verify = async (code: string) => {
  snackbar.reset();

  if (!factor.value) {
    return;
  }

  isLoading.value = true;

  try {
    await challengeAndVerify(factor.value.id, code);

    open.value = false;
  } catch (error) {
    useDebug(error);

    snackbar.error('An error occurred while verifying the 6-digit verification code.')

    isLoading.value = false;
  }
};

watch(open, async (value) => {
  if (!value) {
    return;
  }

  try {
    const unverifiedFactor = await getUnverifiedFactor();

    if (unverifiedFactor) {
      await unenroll(unverifiedFactor.id);
    }

    factor.value = await enroll();
  } catch (error) {
    useDebug(error);
  }

  isLoading.value = false;
});
</script>

<template>
  <v-dialog
    v-model="open"
    width="500"
  >
    <template #activator="{ props }">
      <v-btn
        variant="flat"
        color="primary"
        text="Enable Authenticator App"
        v-bind="props"
      />
    </template>
    <v-card :loading="isLoading">
      <v-card-title class="d-flex align-center justify-space-between">
        Enable Authenticator App
        <v-btn
          variant="text"
          size="small"
          icon="mdi-close"
          title="Close"
          @click="open = false"
        />
      </v-card-title>
      <v-card-text class="text-body-1">
        <p>Follow the one-time instructions below to set up two-factor authentication.</p>
        <ol>
          <li>
            Download and install
            <external-link
              href="https://support.google.com/accounts/answer/1066447"
              text="Google Authenticator"
            />
            or
            <external-link
              href="https://www.authy.com"
              text="Authy"
            />
            for your phone or tablet.
          </li>
          <li>Open the authenticator app and scan the image below, using your phone's camera.</li>
        </ol>
        <v-img
          :src="factor?.totp.qr_code"
          :alt="factor?.totp.uri"
          aspect-ratio="1"
        />
        <v-text-field
          :model-value="factor?.totp.secret"
          readonly
          label="Secret"
        />
        <ol start="3">
          <li>Enter the 6-digit verification code generated.</li>
        </ol>
        <v-otp-input
          :loading="isLoading"
          type="number"
          length="6"
          @finish="verify"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="isLoading"
          variant="text"
          text="Cancel"
          @click="open = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>