<script setup lang="ts">
import type { Card } from '~/types/card';
import { CardSet as CardSetEnum } from '~/utils/card';

const inDeckState = useInDeckState();

const props = defineProps<{
  card: Card,
}>();

const max = computed(() => {
  if (
    props.card.set === CardSetEnum.PREMIERE
    || props.card.set === CardSetEnum.THE_TRUTH_IS_OUT_THERE
  ) {
    const id = props.card.id.replace(/^XF9\d-(\d{4})v\d$/, '$1');
    const alternateId = props.card.id.endsWith('v1') ? `XF97-${id}v2` : `XF96-${id}v1`;
    const quantity = inDeckState.value[alternateId] ?? 0;

    if (quantity > 0) {
      return Math.max(0 , 2 - quantity);
    }
  }

  return 2;
});
</script>

<template>
  <v-number-input
    :disabled="max === 0"
    :model-value="inDeckState[card.id] ?? 0"
    :min="0"
    :max="max"
    :bg-color="inDeckState[card.id] ? 'primary' : undefined"
    hide-details
    width="80"
    max-width="80"
    base-color="primary"
    variant="outlined"
    density="compact"
    control-variant="stacked"
    @click.stop
    @update:model-value="inDeckState[card.id] = $event"
  />
</template>