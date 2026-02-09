<script setup lang="ts">
import type {
  CardId,
  CardInDeck,
} from '~/types/card';
import { getColorByCost } from '~/utils/color';

const props = withDefaults(defineProps<{
  cardIds?: Record<CardId, number>;
}>(), {
  cardIds: () => ({}),
});

const pool = await usePool();

const cards = computed<CardInDeck[]>(() => (
  Object.entries(props.cardIds).map(([
    id,
    quantity,
  ]) => {
    const card = pool.find((card) => card.id === id)!;

    return {
      ...card,
      quantity,
    };
  })
));

const total = computed<number>(() => cards.value.reduce((total, card) => total + card.quantity, 0));

const costs = [
  { title: 'Resource', value: 'RP', color: getColorByCost('resource') },
  { title: 'Conspiracy', value: 'CP', color: getColorByCost('conspiracy') },
  { title: 'Resource or Conspiracy', value: '*P', color: getColorByCost('star') },
];
</script>

<template>
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
  <deck-team :cards="cards" />
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
</template>
