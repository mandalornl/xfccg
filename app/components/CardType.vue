<script setup lang="ts">
import type { CardType } from '~/types/card';

const { text } = defineProps<{
  text: CardType,
}>();

const color = computed(() => getColorByType(text));
</script>

<template>
  <v-chip
    :text="text"
    :color="color"
    label
    variant="flat"
  />
</template>
