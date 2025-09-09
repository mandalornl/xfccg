<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { CardType as CardTypeEnum } from '~/types/card';

const props = defineProps<{
  cards: CardInDeck[];
  title: string;
  keywords: string[];
}>();

const items = computed<{
  title: string,
  count: number,
}[]>(() => {
  const groups = props.cards
    .filter((card) => card.type === CardTypeEnum.Site)
    .reduce<Record<string, number>>((result, card) => {
      for (const keyword of props.keywords) {
        if (!card.keywords?.includes(keyword)) {
          continue;
        }

        result[keyword] = (result[keyword] ?? 0) + card.quantity;
      }

      return result;
    }, {});

  const collator = new Intl.Collator('en', {
    sensitivity: 'base',
  });

  return Object.entries(groups)
    .sort(([
      titleA,
      countA,
    ], [
      titleB,
      countB,
    ]) => {
      if (countA === countB) {
        return collator.compare(titleA, titleB)
      }

      return countB - countA;
    })
    .map(([
      title,
      count,
    ]) => ({
      title,
      count,
    }));
});
</script>

<template>
  <v-table
    striped="odd"
    density="compact"
  >
    <thead>
      <tr>
        <th>{{ title }}</th>
        <th class="w-0 text-no-wrap text-right">
          Count
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of items"
        :key="item.title"
      >
        <td>{{ item.title }}</td>
        <td class="w-0 text-no-wrap text-right">
          {{ item.count }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>