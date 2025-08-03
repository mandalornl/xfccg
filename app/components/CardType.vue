<script setup lang="ts">
import { CardType as CardTypeEnum } from '~/types/card';

const props = defineProps<{
  text: string,
}>();

const color = computed(() => ({
  [CardTypeEnum.Adversary]: 'green-darken-2',
  [CardTypeEnum.Agent]: 'white',
  [CardTypeEnum.Bluff]: 'grey-darken-1',
  [CardTypeEnum.Combat]: 'red-darken-4',
  [CardTypeEnum.Equipment]: 'light-blue-darken-3',
  [CardTypeEnum.Event]: 'pink-darken-2',
  [CardTypeEnum.Site]: 'blue-darken-4',
  [CardTypeEnum.Witness]: 'purple-darken-1',
  [CardTypeEnum.XFile]: 'yellow',
  'Credits': 'orange-darken-2',
}[props.text]));
</script>

<template>
  <v-chip
    :text="text"
    :color="color"
    label
    variant="flat"
  />
</template>