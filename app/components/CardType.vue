<script setup lang="ts">
import type { CardType as CardTypeEnum } from '~/types/card';

const props = defineProps<{
  text: CardTypeEnum,
}>();

const color = computed(() => getColorByType(props.text));
</script>

<template>
  <v-chip
    :text="text"
    :color="color"
    label
    variant="flat"
  />
</template>