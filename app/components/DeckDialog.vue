<script setup lang="ts">
import { useDisplay } from 'vuetify';

import type { Decklist } from '~/types/deck';

const { smAndDown } = useDisplay();
const user = useSupabaseUser();
const route = useRoute();

const deck = defineModel<Decklist>();
const openSaveDeck = ref<boolean>(false);
</script>

<template>
  <v-dialog
    :model-value="!!deck"
    :fullscreen="smAndDown"
    scrollable
    width="960"
    @update:model-value="(value) => !value && (deck = undefined)"
  >
    <v-card>
      <v-card-item>
        <v-card-title class="d-flex align-center justify-space-between">
          <div class="text-truncate">
            {{ deck?.title || 'Untitled' }}
          </div>
          <v-btn
            v-tooltip:top="'Close'"
            variant="text"
            icon="mdi-close"
            size="small"
            @click="deck = undefined"
          />
        </v-card-title>
        <v-card-subtitle
          v-if="deck?.created_by"
          class="d-flex align-center justify-space-between"
        >
          <span>by <span class="text-primary">{{ deck?.created_by }}</span></span>
          <date-time
            v-if="deck?.created_at"
            :date="deck?.created_at"
            format="fullDate"
          />
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-body-1">
        <deck-view
          v-if="deck?.card_ids"
          :card-ids="deck?.card_ids"
        />
      </v-card-text>
      <v-card-actions v-if="user && route.name === 'cards'">
        <v-btn
          variant="text"
          text="Cancel"
          @click="deck = undefined"
        />
        <v-btn
          variant="flat"
          color="primary"
          text="Save Deck"
          @click="openSaveDeck = true"
        />
        <save-deck-dialog v-model="openSaveDeck" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
