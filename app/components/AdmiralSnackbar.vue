<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();
const { state } = useSnackbar();
</script>

<template>
  <v-snackbar
    v-model="state.visible"
    :text="state.text"
    :color="state.color"
    :timeout="state.timeout"
    :multi-line="xs"
    :location="xs ? 'bottom center' : 'top center'"
    content-class="text-pre-line"
  >
    <template #actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        size="small"
        @click="state.visible = false"
      />
    </template>
  </v-snackbar>
</template>
