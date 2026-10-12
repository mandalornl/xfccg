<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps<{
  error?: NuxtError,
}>();

const message = computed(() => {
  switch (error?.status) {
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    default: return 'Internal Server Error';
  }
});

watchEffect(() => {
  if (!error) {
    return;
  }

  useDebug(error);
});

const handleError = () => clearError({
  redirect: '/'
});
</script>

<template>
  <v-container height="100vh">
    <v-row class="align-center justify-center fill-height">
      <v-col>
        <v-empty-state :headline="message">
          <template #media>
            <x-logo
              height="96"
              class="mb-6"
            />
          </template>
          <template #actions>
            <v-btn
              to="/"
              variant="flat"
              color="primary"
              text="Go back home"
              @click.prevent="handleError"
            />
          </template>
        </v-empty-state>
      </v-col>
    </v-row>
  </v-container>
</template>
