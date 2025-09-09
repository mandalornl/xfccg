<script setup lang="ts">
import xFiles from '~/assets/checklist/x-files.json';

import {
  type Card,
  CardSet as CardSetEnum,
} from '~/types/card';
import { XFileCharacteristic as XFileCharacteristicEnum } from '~/types/x-file';

useHead({
  title: 'Checklist',
});

const pool = await usePool([
  CardSetEnum.Premiere,
]);

const checklist = computed<Card[][]>(() => (
  xFiles.map((ids) => ids.map((id) => pool.find((card) => card.id === id)!))
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

const history = ref<string[][]>([]);
const undoing = ref<boolean>(false);

watch(identifiedCards, (newValue, oldValue) => {
  if (undoing.value || newValue.length === 0) {
    return;
  }

  history.value.push([ ...oldValue ]);
});

const undo = async () => {
  if (history.value.length === 0) {
    return;
  }

  const [ snapshot ] = history.value.splice(-1, 1);

  if (!snapshot) {
    return;
  }

  undoing.value = true;

  identifiedCards.value = [ ...snapshot ];

  await nextTick();

  undoing.value = false;
};

const reset = () => {
  history.value = [];
  identifiedCards.value = [];
};
</script>

<template>
  <layout-content
    fluid
    size="large"
  >
    <div class="d-flex justify-end ga-2 mb-3">
      <v-btn
        :disabled="history.length === 0"
        text="Undo"
        variant="flat"
        @click="undo"
      />
      <v-btn
        :disabled="history.length === 0"
        text="Reset"
        variant="flat"
        @click="reset"
      />
    </div>
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
            <td class="px-2">
              <v-checkbox
                v-model="identifiedCards"
                :disabled="identifiedCards.includes(card.id)"
                :value="card.id"
                hide-details
                multiple
                width="max-content"
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
              class="px-2"
            >
              <v-checkbox
                v-model="identifiedCards"
                :disabled="identifiedCards.includes(card.id)"
                :value="characteristic"
                hide-details
                multiple
                width="max-content"
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