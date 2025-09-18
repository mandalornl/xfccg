<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { CardType } from '~/types/card';
import { getColorByType } from '~/utils/color';

const props = withDefaults(defineProps<{
  cards: CardInDeck[];
  height?: number;
}>(), {
  height: 200,
});

const items = computed<{
  total: number,
  title: string,
  color: string | undefined,
  height: number,
}[]>(() => {
  const items = [
    CardType.Adversary,
    CardType.Agent,
    CardType.Bluff,
    CardType.Combat,
    CardType.Equipment,
    CardType.Event,
    CardType.Site,
    CardType.Witness,
  ]
    .map((type) => {
      const total = props.cards
        .filter((card) => card.type === type)
        .reduce((total, card) => total + card.quantity, 0);

      return {
        total,
        title: type,
        color: getColorByType(type),
      };
    })
    .sort(useSort([
      { key: 'total', order: 'desc' },
      { key: 'title', order: 'asc' },
    ]));

  const max = Math.max(...items.map((item) => item.total));

  return items.map((item) => ({
    ...item,
    height: props.height * item.total / max,
  }));
});
</script>

<template>
  <div class="d-flex align-end ga-2">
    <v-card
      v-for="item of items"
      :key="item.title"
      v-tooltip:top="`${item.title} (${item.total})`"
      :color="item.color"
      :height="item.height"
      width="12.5%"
      class="flex-fill"
    >
      <v-card-subtitle class="d-flex justify-center">
        {{ item.total }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>