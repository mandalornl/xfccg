<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error?: NuxtError,
}>();

const message = computed(() => {
  switch (props.error?.statusCode) {
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    default: return 'Internal Server Error';
  }
});

watchEffect(() => {
  if (!props.error) {
    return;
  }

  useDebug(props.error);
});

const handleError = () => clearError({
  redirect: '/'
});
</script>

<template>
  <v-container height="100vh">
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
      <v-col>
        <v-empty-state :headline="message">
          <template #media>
            <v-img
              src="/logo.svg"
              alt="The X-Files CCG"
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
