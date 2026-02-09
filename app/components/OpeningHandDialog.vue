<script setup lang="ts">
import {
  type CardId,
  type Card,
  CardType,
} from '~/types/card';
import { shuffle } from '~/utils/shuffle';

const pool = await usePool();

const props = withDefaults(defineProps<{
  cardIds?: Record<CardId, number>;
}>(), {
  cardIds: () => ({}),
});

const isOpen = ref<boolean>(false);
const openingHand = ref<Card[]>([]);
const drawForTurn = ref<boolean>(false);

const cards = computed<Card[]>(() => (
  Object.entries(props.cardIds)
    .flatMap(([
      id,
      length,
    ]) => {
      const card = pool.find((card) => card.id === id)!;

      return Array.from({ length }, () => ({
        ...card,
        uuid: crypto.randomUUID(),
      }));
    })
    .filter((card) => card.type !== CardType.Agent)
));

const drawOpeningHand = () => {
  openingHand.value = shuffle<Card[]>(cards.value).slice(0, 8);
  drawForTurn.value = false;
};

watch(isOpen, (value) => {
  if (!value) {
    return;
  }

  drawOpeningHand();
});
</script>

<template>
  <v-dialog
    v-model="isOpen"
    scrollable
    width="768"
  >
    <template #activator="{ props:dialogProps }">
      <v-btn
        :disabled="cards.length === 0"
        variant="tonal"
        text="Opening Hand"
        v-bind="dialogProps"
      />
    </template>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        Opening Hand
        <v-btn
          v-tooltip:top="'Close'"
          variant="text"
          icon="mdi-close"
          size="small"
          @click="isOpen = false"
        />
      </v-card-title>
      <v-card-text class="text-body-1">
        <v-row>
          <v-col
            v-for="(card, index) of openingHand"
            :key="card.uuid"
            cols="6"
            sm="3"
          >
            <v-slide-x-reverse-transition
              v-if="index === openingHand.length - 1"
              mode="out-in"
            >
              <card-image
                v-if="drawForTurn"
                key="card"
                :card="card"
              />
              <div
                v-else
                key="button"
                class="d-flex align-center justify-center fill-height"
              >
                <v-btn
                  variant="flat"
                  text="Draw For Turn"
                  @click="drawForTurn = true"
                />
              </div>
            </v-slide-x-reverse-transition>
            <card-image
              v-else
              :card="card"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="flat"
          color="primary"
          text="Shuffle"
          @click="drawOpeningHand"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
