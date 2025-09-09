<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import type {
  Card,
  CardType as CardTypeEnum,
} from '~/types/card';

const props = defineProps<{
  cards: CardInDeck[];
}>();

const groups = computed(() => (
  Object.fromEntries(
    Object.entries(
      props.cards.reduce((result, card) => {
        result[card.type] = [
          ...result[card.type] ?? [],
          card,
        ];

        return result;
      }, {} as Record<CardTypeEnum, CardInDeck[]>)
    )
      .sort(([
        typeA,
        cardsA,
      ], [
        typeB,
        cardsB,
      ]) => {
        if (cardsA.length === cardsB.length) {
          return typeA.localeCompare(typeB);
        }

        return cardsB.length - cardsA.length;
      })
      .map(([
        type,
        cards,
      ]) => ([
        `${type} (${cards.length})`,
        cards
      ]))
  )
));

const selectedCard = ref<Card>();
</script>

<template>
  <div class="column-2">
    <div
      v-for="(items, type) of groups"
      :key="type"
    >
      <v-table
        striped="odd"
        density="compact"
        class="mb-3"
      >
        <thead>
          <tr>
            <th colspan="2">
              {{ type }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item of items"
            :key="item.id"
            class="cursor-pointer"
            @click="selectedCard = { ...item }"
          >
            <td class="w-0 text-no-wrap">
              {{ item.quantity }}x
            </td>
            <td class="text-no-wrap">
              {{ item.title }}
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