<script setup lang="ts">
import type { CardType } from '~/types/card';

const props = defineProps<{
  text: CardType,
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
