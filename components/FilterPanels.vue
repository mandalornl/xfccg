<script lang="ts" setup>
import type { Filter } from '~/types/filter';
import type { Card } from '~/types/card';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

const route = useRoute();

const props = withDefaults(defineProps<{
  expanded?: string[],
  pool: Card[],
}>(), {
  expanded: () => ([]),
});

const filters = defineModel<Filter[]>({
  default: () => ([]),
});

const expandedFilters = ref<string[]>(props.expanded);

const hasAnyFilters = computed(() => filters.value.some((filter) => filter.value.length > 0));

const clearAllFilters = () => {
  for (const filter of filters.value) {
    filter.value = [];
  }
};

const getValue = (key: string, defaultValue: string[]): string[] => {
  if (!route.query[key]) {
    return defaultValue;
  }

  const value = route.query[key] as string;
  const or = value.includes(',');

  return value
    .split(or ? ',' : '+')
    .filter(Boolean);
};

const getOperation = (key: string, defaultOperation: FilterOperationEnum): FilterOperationEnum => {
  if (!route.query[key]) {
    return defaultOperation;
  }

  const value = route.query[key] as string;

  return value.includes(',') ? FilterOperationEnum.OR : FilterOperationEnum.AND;
};

onMounted(() => {
  for (const filter of filters.value) {
    filter.value = getValue(filter.key, filter.value);
    filter.operation = getOperation(filter.key, filter.operation);
  }
});
</script>

<template>
  <v-expand-transition>
    <div v-if="hasAnyFilters">
      <v-btn
        variant="tonal"
        size="small"
        text="Clear Filters"
        class="mb-4"
        @click="clearAllFilters"
      />
    </div>
  </v-expand-transition>
  <v-expansion-panels
    v-model="expandedFilters"
    multiple
  >
    <v-expansion-panel
      v-for="filter of filters"
      :key="filter.key"
      :value="filter.key"
    >
      <v-expansion-panel-title>
        {{ filter.title }} ({{ filter.value.length }})
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <filter-operation v-model="filter.operation" />
        <filter-value
          v-model="filter.value"
          :filter="filter"
          :pool="pool"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>