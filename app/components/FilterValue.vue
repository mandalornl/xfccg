<script setup lang="ts" generic="T">
import type { Filter } from '~/types/filter';

defineProps<{
  filter: Filter<T>,
}>();

const model = defineModel<string[]>({
  default: () => ([])
});
</script>

<template>
  <v-autocomplete
    v-model="model"
    :items="filter.items"
    :label="filter.title"
    chips
    multiple
    clearable
    closable-chips
    auto-select-first
    hide-selected
    hide-details
    variant="outlined"
    placeholder="Type to search"
  />
</template>
