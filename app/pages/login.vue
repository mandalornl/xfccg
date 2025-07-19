<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();
const snackbarState = useSnackbarState();

const getEmail = () => {
  if (route.query.email) {
    return decodeURIComponent(route.query.email as string);
  }

  return runtimeConfig.public.login.email || '';
};

const isValidForm = ref<boolean>(true);
const isSigningIn = ref<boolean>(false);
const isSigningInWithDiscord = ref<boolean>(false);
const email = ref<string>(getEmail());
const password = ref<string>(runtimeConfig.public.login.password || '');

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const signInWithDiscord = async () => {
  snackbarState.reset();

  isSigningInWithDiscord.value = true;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${runtimeConfig.public.baseUrl}/confirm`,
    },
  });

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred signing in with Discord.');
  }

  setTimeout(() => {
    isSigningInWithDiscord.value = true;
  }, 200);
};

const signIn = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  isSigningIn.value = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    snackbarState.error('An error occurred signing in.');
  }

  setTimeout(() => {
    isSigningIn.value = false;
  }, 200);
};

watch(user, (value) => {
  if (!value) {
    return;
  }

  return navigateTo('/account', {
    replace: true
  });
});
</script>

<template>
  <layout-content
    title="Welcome back"
    size="small"
  >
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
        variant="flat"
        color="primary"
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
  </layout-content>
</template>