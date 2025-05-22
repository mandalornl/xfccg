<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();
const isValidForm = ref<boolean>(true);
const isSigningIn = ref<boolean>(false);
const email = ref<string>(runtimeConfig.public.login.email || '');
const password = ref<string>(runtimeConfig.public.login.password || '');

definePageMeta({
  middleware: [
    'anonymous',
  ],
});

const signInWithDiscord = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${runtimeConfig.public.baseUrl}/confirm`,
    },
  });

  if (error) {
    useDebug(error);
  }
};

const signIn = async (event: SubmitEventPromise) => {
  const { valid } = await event;

  if (!valid) {
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    useDebug(error);
  }
};

watch(user, async (value) => {
  if (!value) {
    return;
  }

  await navigateTo('/', {
    replace: true,
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
      <span class="mx-2">or</span>
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
  </layout-content>
</template>