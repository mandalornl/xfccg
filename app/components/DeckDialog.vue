<script setup lang="ts">
import { useDisplay } from 'vuetify';

import type {
  Deck,
  CardInDeck,
} from '~/types/deck';
import { getColorByCost } from '~/utils/color';

const { smAndDown } = useDisplay();
const pool = await usePool();
const user = useSupabaseUser();

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

const total = computed<number>(() => cards.value.reduce((total, card) => total + card.quantity, 0));

const costs = [
  { title: 'Resource', value: 'RP', color: getColorByCost('resource') },
  { title: 'Conspiracy', value: 'CP', color: getColorByCost('conspiracy') },
  { title: 'Resource or Conspiracy', value: '*P', color: getColorByCost('star') },
];

const onClickEditName = () => {
  alert('TODO');
};
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
          <div class="d-flex align-center">
            {{ deck?.title }}
            <v-btn
              v-if="user?.sub === deck?.profile_id"
              v-tooltip:top="'Edit name'"
              variant="text"
              icon="mdi-pencil"
              size="small"
              @click="onClickEditName"
            />
          </div>
          <v-btn
            v-tooltip:top="'Close'"
            variant="text"
            icon="mdi-close"
            size="small"
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
        <deck-card-types :cards="cards" />
        <x-divider
          :text="`Cards (${total})`"
          class="my-4"
        />
        <deck-card-list :cards="cards" />
        <x-divider
          text="Team"
          class="my-4"
        />
        <deck-team-stats :cards="cards" />
        <x-divider
          text="Sites"
          class="my-4"
        />
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <deck-site-questions :cards="cards" />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <deck-site-prerequisites :cards="cards" />
          </v-col>
        </v-row>
        <x-divider
          text="Cost"
          class="my-4"
        />
        <v-row>
          <v-col
            v-for="cost of costs"
            :key="cost.title"
            cols="12"
            sm="4"
          >
            <deck-card-costs
              :title="cost.title"
              :value="cost.value"
              :cards="cards"
              :color="cost.color"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
