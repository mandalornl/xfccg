<script setup lang="ts">
import xFiles from '~/assets/checklist/x-files.json';
import premiere from '~/assets/cards/premiere.json';

import type { Card } from '~/types/card';
import { XFileCharacteristic as XFileCharacteristicEnum } from '~/types/x-file';

useHead({
  title: 'Checklist',
});

const pool = premiere as unknown as Card[];

const checklist = computed<Card[][]>(() => (
  xFiles.map((ids) => (
    ids
      .map((id) => pool.find((card) => card.id === id))
      .filter((card) => card !== undefined)
  ))
));

const identifiedCards = ref<string[]>([]);

const totalUnidentified = computed<number>(() => (
  checklist.value.reduce((total, cards) => (
    total + cards.filter((card) => !identifiedCards.value.includes(card.id)).length
  ), 0)
));

const textColor = computed<string | undefined>(() => {
  if (totalUnidentified.value <= 5) {
    return 'text-green-accent-2';
  } else if (totalUnidentified.value <= 10) {
    return 'text-orange-accent-2';
  } else if (totalUnidentified.value <= 15) {
    return 'text-red-accent-2';
  } else {
    return undefined;
  }
});

const toggleCards = (characteristic: string) => {
  for (const cards of checklist.value) {
    for (const card of cards) {
      const characteristics: string[] = Object.values(card.characteristics ?? {});

      if (!characteristics.includes(characteristic)) {
        continue;
      }

      identifiedCards.value.push(card.id);
    }
  }
};
</script>

<template>
  <layout-content
    fluid
    size="large"
  >
    <v-table>
      <template
        v-for="(cards, checklistIndex) of checklist"
        :key="checklistIndex"
      >
        <tbody>
          <tr class="text-h6">
            <th>X-File ({{ totalUnidentified }} unidentified)</th>
            <th>{{ XFileCharacteristicEnum.Affiliation }}</th>
            <th>{{ XFileCharacteristicEnum.Motive }}</th>
            <th>{{ XFileCharacteristicEnum.Method }}</th>
            <th>{{ XFileCharacteristicEnum.Result }}</th>
          </tr>
        </tbody>
        <tbody>
          <tr
            v-for="card of cards"
            :key="card.id"
          >
            <td>
              <v-checkbox
                v-model="identifiedCards"
                :disabled="identifiedCards.includes(card.id)"
                :value="card.id"
                hide-details
                multiple
              >
                <template #label>
                  <span :class="identifiedCards.includes(card.id) ? 'text-decoration-line-through' : textColor">
                    {{ card.title }}
                  </span>
                </template>
              </v-checkbox>
            </td>
            <td
              v-for="characteristic of card.characteristics"
              :key="card.id + characteristic"
            >
              <v-checkbox
                v-model="identifiedCards"
                :disabled="identifiedCards.includes(card.id)"
                :value="characteristic"
                hide-details
                multiple
                @change="toggleCards(characteristic)"
              >
                <template #label>
                  <span :class="identifiedCards.includes(card.id) ? 'text-decoration-line-through' : undefined">
                    {{ characteristic }}
                  </span>
                </template>
              </v-checkbox>
            </td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </layout-content>
</template>