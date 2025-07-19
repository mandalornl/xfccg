<script lang="ts" setup>
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

const model = defineModel<string | null>();

const items = [
  { title: 'And', value: FilterOperationEnum.AND },
  { title: 'Or', value: FilterOperationEnum.OR },
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