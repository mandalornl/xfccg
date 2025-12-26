<script setup lang="ts">
import type { CardInDeck } from '~/types/card';

const props = defineProps<{
  cards: CardInDeck[];
  title: string;
  value: string;
  color?: string;
}>();

const items = computed<{
  cost: string,
  total: number,
}[]>(() => (
  Object.entries(
    props.cards
      .filter((card) => card.cost?.endsWith(props.value))
      .reduce<Record<string, number>>((result, card) => {
        const key = card.cost?.replace(` ${props.value}`, '') ?? 0;

        return {
          ...result,
          [key]: (result[key] ?? 0) + card.quantity
        };
      }, {})
  )
    .map(([
      cost,
      total,
    ]) => ({
      cost,
      total,
    }))
    .sort(useSortBy([
      {
        key: 'total',
        order: 'desc',
      },
      {
        key: 'cost',
        order: 'asc',
      },
    ]))
));

const total = computed<number>(() => (
  items.value.reduce((total, item) => total + item.total, 0)
));
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
          :key="item.cost + item.total"
        >
          <td class="text-no-wrap">
            {{ item.cost }}
          </td>
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
    <tfoot>
      <tr class="font-weight-bold">
        <td>Total</td>
        <td class="w-0 text-no-wrap text-right">
          {{ total }}x
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>
