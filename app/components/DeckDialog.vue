<script setup lang="ts">
import { useDisplay } from 'vuetify';

import type {
  Deck,
  CardInDeck,
} from '~/types/deck';

const { smAndDown } = useDisplay();
const pool = await usePool();

const deck = defineModel<Deck>();

const cards = computed<CardInDeck[]>(() => {
  if (!deck.value) {
    return [];
  }

  return Object.entries(deck.value.card_ids).map(([
    id,
    quantity,
  ]) => {
    const card = pool.find((card) => card.id === id)!;

    return {
      ...card,
      quantity,
    };
  });
});
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
          {{ deck?.name }}
          <v-btn
            variant="text"
            icon="mdi-close"
            size="small"
            title="Close"
            @click="deck = undefined"
          />
        </v-card-title>
        <v-card-subtitle class="d-flex align-center justify-space-between">
          <span>by <span class="text-primary">{{ deck?.created_by }}</span></span>
          <date-time
            v-if="deck?.created_at"
            :date="deck?.created_at"
            format="fullDate"
          />
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="text-body-1">
        <v-row>
          <v-col
            cols="12"
            lg="6"
          >
            <stats-list :cards="cards" />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <v-row>
              <v-col cols="12">
                <stats-type :cards="cards" />
              </v-col>
              <v-col
                v-for="type of [ 'RP', 'CP', '*P' ]"
                :key="type"
                cols="12"
                sm="4"
              >
                <stats-cost
                  :type="type"
                  :cards="cards"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <stats-site-question :cards="cards" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <stats-site-prerequisite :cards="cards" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>