<script setup lang="ts">
import {
  type Card,
  CardSet,
} from '~/types/card';
import { slugify } from '~/utils/slugify';

const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
  card?: Card,
  maxWidth?: number | string,
}>();

const src = computed(() => {
  if (!props.card) {
    return undefined;
  }

  const root = `${runtimeConfig.app.baseURL}images/cards`;

  if (
    props.card.set === CardSet.Classified
    || props.card.set === CardSet.FightTheFuture
    || props.card.set === CardSet.BirthdayScully
  ) {
    return `${root}/back.jpg`;
  }

  return `${root}/${slugify(props.card?.set)}/${slugify(props.card?.id)}.jpg`;
});
</script>

<template>
  <v-img
    :src="src"
    :alt="card?.title"
    :aspect-ratio="5/7"
    :max-width="maxWidth"
    lazy-src="/images/cards/back.jpg"
  />
</template>

<style lang="scss" scoped>
.v-img {
  border-radius: 16px;
}
</style>
