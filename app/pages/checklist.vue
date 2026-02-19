<script setup lang="ts">
import xFiles from '~/assets/checklist/x-files.json';

import {
  type Card,
  CardSet,
} from '~/types/card';
import { XFileCharacteristic } from '~/types/x-file';

useHead({
  title: 'Checklist',
});

const pool = await usePool([
  CardSet.Premiere,
]);

const checklist = computed<Card[][]>(() => (
  xFiles.map((ids) => ids.map((id) => pool.find((card) => card.id === id)!))
));

const identifiedCards = useState<string[]>('checklist:identifiedCards', () => ([]));

const totalUnidentified = computed<number>(() => (
  checklist.value.reduce((total, cards) => (
    total + cards.filter((card) => !identifiedCards.value.includes(card.id)).length
  ), 0)
));

const textColor = computed<string | undefined>(() => {
  if (totalUnidentified.value <= 5) {
    return 'text-green';
  } else if (totalUnidentified.value <= 10) {
    return 'text-orange';
  } else if (totalUnidentified.value <= 15) {
    return 'text-red';
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

const history = useState<string[][]>('checklist:history', () => ([]));
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
    title="Checklist"
    size="large"
  >
    <v-table>
      <template #top>
        <v-sheet class="d-flex justify-end ga-2 position-sticky pa-2">
          <v-btn
            v-tooltip:top="'Undo'"
            :disabled="history.length === 0"
            rounded
            variant="text"
            icon="mdi-undo"
            @click="undo"
          />
          <v-btn
            v-tooltip:top="'Reset'"
            :disabled="history.length === 0"
            rounded
            variant="text"
            icon="mdi-refresh"
            @click="reset"
          />
        </v-sheet>
      </template>
      <template
        v-for="(cards, checklistIndex) of checklist"
        :key="checklistIndex"
      >
        <tbody>
          <tr class="text-h6">
            <th>X-File ({{ totalUnidentified }} unidentified)</th>
            <th>{{ XFileCharacteristic.Affiliation }}</th>
            <th>{{ XFileCharacteristic.Motive }}</th>
            <th>{{ XFileCharacteristic.Method }}</th>
            <th>{{ XFileCharacteristic.Result }}</th>
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
                  <span :class="identifiedCards.includes(card.id) ? 'text-decoration-line-through' : textColor">
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
