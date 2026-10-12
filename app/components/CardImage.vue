<script setup lang="ts">
import {
  type Card,
  CardSet,
} from '~/types/card';
import { slugify } from '~/utils/slugify';

const runtimeConfig = useRuntimeConfig();

const {
  card = undefined,
  maxWidth = undefined,
} = defineProps<{
  card?: Card,
  maxWidth?: number | string,
}>();

const src = computed(() => {
  if (!card) {
    return undefined;
  }

  const root = `${runtimeConfig.app.baseURL}images/cards`;

  if (
    card.set === CardSet.Classified
    || card.set === CardSet.BirthdayScully
  ) {
    return `${root}/back.jpg`;
  }

  return `${root}/${slugify(card.set)}/${slugify(card.id)}.jpg`;
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
