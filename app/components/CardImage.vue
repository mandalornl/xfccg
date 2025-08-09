<script setup lang="ts">
import {
  type Card,
  CardSet as CardSetEnum,
} from '~/types/card';

const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
  card?: Card,
  maxWidth?: number | string,
}>();

const src = computed(() => {
  if (!props.card) {
    return undefined;
  }

  const root = `${runtimeConfig.app.baseURL}cards`;

  if (
    props.card.set === CardSetEnum.Classified
    || props.card.set === CardSetEnum.FightTheFuture
  ) {
    return `${root}/back.jpg`;
  }

  return `${root}/${props.card?.set}/${props.card?.id}.jpg`
    .replaceAll(' ', '-')
    .toLowerCase();
});
</script>

<template>
  <v-img
    :src="src"
    :alt="card?.title"
    :aspect-ratio="5/7"
    :max-width="maxWidth"
    lazy-src="/cards/back.jpg"
  />
</template>

<style lang="scss" scoped>
.v-img {
  border-radius: 16px;
}
</style>