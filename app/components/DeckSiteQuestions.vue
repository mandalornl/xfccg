<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { XFileCharacteristic as XFileCharacteristicEnum } from '~/types/x-file';

defineProps<{
  cards: CardInDeck[];
}>();
</script>

<template>
  <deck-site
    :cards="cards"
    :keywords="[
      XFileCharacteristicEnum.Affiliation,
      XFileCharacteristicEnum.Motive,
      XFileCharacteristicEnum.Method,
      XFileCharacteristicEnum.Result,
    ]"
    title="Question"
  />
</template>