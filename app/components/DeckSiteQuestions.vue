<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { XFileCharacteristic } from '~/types/x-file';

defineProps<{
  cards: CardInDeck[];
}>();
</script>

<template>
  <deck-site
    :cards="cards"
    :keywords="[
      XFileCharacteristic.Affiliation,
      XFileCharacteristic.Motive,
      XFileCharacteristic.Method,
      XFileCharacteristic.Result,
    ]"
    title="Question"
  />
</template>