<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();
const { snackbarState } = useSnackbarState();
</script>

<template>
  <v-snackbar
    v-model="snackbarState.visible"
    :text="snackbarState.text"
    :color="snackbarState.color"
    :timeout="snackbarState.timeout"
    :multi-line="xs"
    :location="xs ? 'bottom center' : 'top center'"
    content-class="text-pre-line"
  >
    <template #actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        size="small"
        @click="snackbarState.visible = false"
      />
    </template>
  </v-snackbar>
</template>
