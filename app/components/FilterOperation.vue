<script setup lang="ts">
import { FilterOperation } from '~/types/filter';

const model = defineModel<string | null>();

const items = [
  { title: 'And', value: FilterOperation.And },
  { title: 'Or', value: FilterOperation.Or },
];
</script>

<template>
  <v-select
    v-model="model"
    :items="items"
    hide-details
    min-width="100"
    variant="outlined"
  />
</template>