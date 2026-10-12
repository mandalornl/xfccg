<script setup lang="ts">
import {
  CardType,
  type CardInDeck,
} from '~/types/card';
import { getColorByType } from '~/utils/color';

const {
  cards,
  height = 200,
} = defineProps<{
  cards: CardInDeck[];
  height?: number;
}>();

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
      const total = cards
        .filter((card) => card.type === type)
        .reduce((total, card) => total + card.quantity, 0);

      return {
        total,
        title: type,
        color: getColorByType(type),
      };
    })
    .sort(useSortBy([
      {
        key: 'total',
        order: 'desc',
      },
      {
        key: 'title',
        order: 'asc',
      },
    ]));

  const max = Math.max(...items.map((item) => item.total));

  return items.map((item) => ({
    ...item,
    height: height * item.total / max,
  }));
});
</script>

<template>
  <div class="d-flex align-end ga-2">
    <template v-if="items.length > 0">
      <v-card
        v-for="item of items"
        :key="item.title"
        v-tooltip:top="`${item.title} (${item.total})`"
        :color="item.color"
        :height="item.height"
        variant="flat"
        width="12.5%"
        class="flex-fill"
      >
        <v-card-subtitle class="d-flex justify-center">
          {{ item.total }}
        </v-card-subtitle>
      </v-card>
    </template>
    <template v-else>
      No cards selected
    </template>
  </div>
</template>
