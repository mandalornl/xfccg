<script lang="ts" setup>
import { useDisplay } from 'vuetify';

import type { Card } from '~/types/card';

const { xs } = useDisplay();

const card = defineModel<Card | null>();
</script>

<template>
  <v-dialog
    :model-value="!!card"
    :fullscreen="xs"
    width="768"
  >
    <v-card>
      <v-card-item>
        <v-card-title class="d-flex align-center justify-space-between">
          {{ card?.title }}
          <v-btn
            variant="text"
            icon="mdi-close"
            size="small"
            title="Close"
            @click="card = null"
          />
        </v-card-title>
        <v-card-subtitle>
          {{ card?.id }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-body-1">
        <x-debug :value="card" />
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            left
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            right
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>