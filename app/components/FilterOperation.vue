<script setup lang="ts">
import { FilterOperation as FilterOperationEnum } from '~/types/filter';

const model = defineModel<string | null>();

const items = [
  { title: 'And', value: FilterOperationEnum.And },
  { title: 'Or', value: FilterOperationEnum.Or },
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