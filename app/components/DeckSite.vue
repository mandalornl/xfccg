<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { CardType } from '~/types/card';
import { getColorByType } from '~/utils/color';

const props = defineProps<{
  cards: CardInDeck[];
  title: string;
  keywords: string[];
}>();

const items = computed<{
  title: string,
  total: number,
}[]>(() => (
  Object.entries(
    props.cards
      .filter((card) => card.type === CardType.Site)
      .reduce<Record<string, number>>((result, card) => {
        for (const keyword of props.keywords) {
          if (!card.keywords?.includes(keyword)) {
            continue;
          }

          result[keyword] = (result[keyword] ?? 0) + card.quantity;
        }

        return result;
      }, {})
  )
    .map(([
      title,
      total,
    ]) => ({
      title,
      total,
    }))
    .sort(useSort([
      { key: 'total', order: 'desc' },
      { key: 'title', order: 'asc' },
    ]))
));

const color = getColorByType('Site');
</script>

<template>
  <v-table
    striped="odd"
    density="compact"
  >
    <thead>
      <tr :class="`bg-${color}`">
        <th
          colspan="2"
          class="text-no-wrap"
        >
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length > 0">
        <tr
          v-for="item of items"
          :key="item.title"
        >
          <td>{{ item.title }}</td>
          <td class="w-0 text-no-wrap text-right">
            {{ item.total }}x
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="2">
          No cards selected
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
