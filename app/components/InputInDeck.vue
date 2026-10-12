<script setup lang="ts">
import {
  type Card,
  CardSet,
  CardType,
} from '~/types/card';

const deckbuilder = useDeckbuilder();

const { card } = defineProps<{
  card: Card,
}>();

const max = computed(() => {
  if (card.id === 'XF97-0437x1') {
    return 1;
  }

  if (
    card.set === CardSet.Premiere
    || card.set === CardSet.TheTruthIsOutThere
  ) {
    const id = card.id.replace(/^XF9\d-(\d{4})v\d$/, '$1');
    const alternateId = card.id.endsWith('v1') ? `XF97-${id}v2` : `XF96-${id}v1`;
    const quantity = deckbuilder.getQuantity(alternateId);

    if (quantity > 0) {
      if (card.type === CardType.Agent) {
        return 0;
      }

      return Math.max(0 , 2 - quantity);
    }
  }

  if (card.type === CardType.Agent) {
    return 1;
  }

  return 2;
});
</script>

<template>
  <v-number-input
    :disabled="max === 0"
    :model-value="deckbuilder.getQuantity(card.id)"
    :min="0"
    :max="max"
    :bg-color="deckbuilder.hasQuantity(card.id) ? 'primary' : undefined"
    flat
    hide-details
    width="80"
    max-width="80"
    variant="solo-filled"
    density="compact"
    control-variant="stacked"
    @click.stop
    @update:model-value="deckbuilder.setQuantity(card.id, $event)"
  />
</template>
