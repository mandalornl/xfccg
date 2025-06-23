<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';
import { AuthApiError } from '@supabase/auth-js';

const route = useRoute();
const supabase = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();
const snackbar = useSnackbarState();

const getEmail = () => {
  if (route.query.email) {
    return decodeURIComponent(route.query.email as string);
  }

  return runtimeConfig.public.login.email || '';
};

const isValidForm = ref<boolean>(true);
const isSigningIn = ref<boolean>(false);
const isSigningInWithDiscord = ref<boolean>(false);
const isVerifying = ref<boolean>(false);
const email = ref<string>(getEmail());
const password = ref<string>(runtimeConfig.public.login.password || '');
const currentStep = ref<string>('login');

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${runtimeConfig.public.baseUrl}/confirm`,
    },
  });

  if (error) {
    throw error;
  }
};

const signInWithDiscord = async () => {
  snackbar.reset();

  isSigningInWithDiscord.value = true;

  try {
    await signInWithOAuth();
  } catch (error) {
    useDebug(error);

    snackbar.error('An error occurred while signing in with Discord.');
  }

  setTimeout(() => {
    isSigningInWithDiscord.value = true;
  }, 200);
};

const signInWithPassword = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    throw error;
  }
};

const getAuthenticatorAssuranceLevel = async () => {
  const {
    data,
    error,
  } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) {
    throw error;
  }

  return data;
};

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

const challengeAndVerify = async (code: string) => {
  const factors = await listFactors();

  const factor = factors?.totp.find((factor) => factor.status === 'verified');

  if (!factor) {
    return new Error('Invalid factor');
  }

  const { error } = await supabase.auth.mfa.challengeAndVerify({
    code,
    factorId: factor.id,
  });

  if (error) {
    throw error;
  }
};

const verify = async (code: string) => {
  snackbar.reset();

  isVerifying.value = true;

  try {
    await challengeAndVerify(code);

    await navigateTo('/account', {
      replace: true
    });
  } catch (error) {
    useDebug(error);

    snackbar.error('An error occurred while verifying the 6-digit verification code.');
  }

  setTimeout(() => {
    isVerifying.value = false;
  }, 200);
};

const signIn = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSigningIn.value = true;

  try {
    await signInWithPassword();

    const {
      currentLevel,
      nextLevel
    } = await getAuthenticatorAssuranceLevel();

    if (currentLevel !== nextLevel && nextLevel === 'aal2') {
      currentStep.value = 'verify';
    } else {
      await navigateTo('/account', {
        replace: true
      });
    }
  } catch (error) {
    useDebug(error);

    if (error instanceof AuthApiError) {
      if (error.code === 'email_not_confirmed') {
        snackbar.error('Please confirm your email address first before you continue by clicking on the link in the email you received upon registration.');

        return;
      }
    }

    snackbar.error('An error occurred while signing in.');
  } finally {
    setTimeout(() => {
      isSigningIn.value = false;
    }, 200);
  }
};

// watch(user, async (value) => {
//   if (!value) {
//     return;
//   }
//
//   await navigateTo('/', {
//     replace: true,
//   });
// });
</script>

<template>
  <layout-content
    title="Welcome back"
    size="small"
  >
    <v-window v-model="currentStep">
      <v-window-item value="login">
        <p>Sign in to your account.</p>
        <v-btn
          block
          variant="flat"
          color="discord"
          size="large"
          text="Continue with Discord"
          @click="signInWithDiscord"
        >
          <template #prepend>
            <v-img
              src="/discord.svg"
              alt="discord"
              width="20"
              height="20"
            />
          </template>
        </v-btn>
        <div class="d-flex align-center my-4">
          <v-divider />
          <span class="mx-2">
        or
      </span>
          <v-divider />
        </div>
        <v-form
          v-model="isValidForm"
          validate-on="lazy"
          @submit.prevent="signIn"
        >
          <input-email
            v-model="email"
            :rules="[ (v) => !!v || 'Enter your email' ]"
            label="Email"
          />
          <input-password
            v-model="password"
            :rules="[ (v) => !!v || 'Enter your password' ]"
            label="Password"
          />
          <p>
            <nuxt-link to="/forgot-password">
              Forgot password?
            </nuxt-link>
          </p>
          <v-btn
            :disabled="isValidForm === false"
            :loading="isSigningIn"
            block
            color="primary"
            variant="flat"
            size="large"
            text="Sign in"
            type="submit"
            class="mb-6"
          />
          <p>
            Don't have an account?
            <nuxt-link to="/register">
              Register now
            </nuxt-link>
          </p>
        </v-form>
      </v-window-item>
      <v-window-item value="verify">
        <v-otp-input
          :loading="isVerifying"
          type="number"
          length="6"
          @finish="verify"
        />
      </v-window-item>
    </v-window>
  </layout-content>
</template>