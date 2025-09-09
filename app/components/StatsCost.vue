<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';

const props = defineProps<{
  cards: CardInDeck[];
  type: string;
}>();

const items = computed<{
  title: string,
  count: number,
}[]>(() => {
  const groups = props.cards
    .filter((card) => card.cost?.endsWith(props.type))
    .reduce<Record<string, number>>((result, card) => {
      const key = card.cost?.replace(` ${props.type}`, '') ?? 0;

      return {
        ...result,
        [key]: (result[key] ?? 0) + card.quantity
      };
    }, {});

  const collator = new Intl.Collator('en', {
    sensitivity: 'base',
    numeric: true,
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
        return collator.compare(titleA, titleB);
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

const total = computed<number>(() => (
  Object.values(items.value).reduce((total, item) => total + item.count, 0)
));
</script>

<template>
  <v-table
    striped="odd"
    density="compact"
  >
    <thead>
      <tr>
        <th>Cost ({{ type }})</th>
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
    <tfoot>
      <tr>
        <td>Total</td>
        <td class="w-0 text-no-wrap text-right">
          {{ total }}
        </td>
      </tr>
    </tfoot>
  </v-table>
</template>