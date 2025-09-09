<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { CardType as CardTypeEnum } from '~/types/card';
import { getColorByType } from '~/utils/color';

const props = withDefaults(defineProps<{
  cards: CardInDeck[];
  height?: number;
}>(), {
  height: 200,
});

const items = computed<{
  type: string,
  count: number,
  title: string,
  color: string | undefined,
  height: number,
}[]>(() => {
  const items = [
    CardTypeEnum.Adversary,
    CardTypeEnum.Agent,
    CardTypeEnum.Bluff,
    CardTypeEnum.Combat,
    CardTypeEnum.Equipment,
    CardTypeEnum.Event,
    CardTypeEnum.Site,
    CardTypeEnum.Witness,
  ].map((type) => {
    const count = props.cards
      .filter((card) => card.type === type)
      .reduce((total, card) => total + card.quantity, 0);

    return {
      type,
      count,
      title: `${type} (${count})`,
      color: getColorByType(type),
    };
  });

  const max = Math.max(...items.map((item) => item.count));

  return items.map((item) => ({
    ...item,
    height: props.height * item.count / max,
  }));
});
</script>

<template>
  <div class="d-flex align-end ga-2">
    <v-card
      v-for="item of items"
      :key="item.title"
      v-tooltip:top="item.title"
      :color="item.color"
      :height="item.height"
      width="12.5%"
      class="flex-fill"
    >
      <v-card-subtitle class="d-flex justify-center">
        {{ item.count }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>