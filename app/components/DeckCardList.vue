<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import type {
  Card,
  CardType as CardTypeEnum,
} from '~/types/card';
import { getColorByType } from '~/utils/color';

const props = defineProps<{
  cards: CardInDeck[];
}>();

const groups = computed<{
  cards: CardInDeck[],
  total: number,
  title: string,
  color: string | undefined,
}[]>(() => (
  Object.entries(
    props.cards.reduce((result, card) => {
      result[card.type] = [
        ...result[card.type] ?? [],
        card,
      ];

      return result;
    }, {} as Record<CardTypeEnum, CardInDeck[]>)
  )
    .map(([
      type,
      cards,
    ]) => {
      const total = cards.reduce((total, card) => total + card.quantity, 0);

      return {
        cards,
        total,
        title: type,
        color: getColorByType(type),
      };
    })
    .sort(useSort([
      {
        key: 'total',
        order: 'desc',
      },
      {
        key: 'title',
        order: 'asc',
      },
    ]))
));

const selectedCard = ref<Card>();
</script>

<template>
  <div class="column-2">
    <div
      v-for="item of groups"
      :key="item.title"
    >
      <v-table
        striped="odd"
        density="compact"
      >
        <thead>
          <tr :class="`bg-${item.color}`">
            <th colspan="2">
              {{ item.title }} ({{ item.total }})
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="card of item.cards"
            :key="card.id"
            class="cursor-pointer"
            @click="selectedCard = { ...card }"
          >
            <td class="w-0 text-no-wrap">
              {{ card.quantity }}x
            </td>
            <td class="text-no-wrap">
              {{ card.title }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
  <card-dialog v-model="selectedCard" />
</template>

<style lang="scss" scoped>
@use 'vuetify/settings';
@use 'vuetify/tools';

@media (tools.breakpoint-min('sm-and-up', settings.$display-breakpoints)) {
  .column-2 {
    column-count: 2;
  }
}
</style>