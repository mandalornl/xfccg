<script setup lang="ts" generic="T">
import {
  type Filter,
  type FilterableValue,
  FilterOperation,
} from '~/types/filter';
import { isObject } from '~/utils/object';

const props = defineProps<{
  filter: Filter<T>,
  items: T[],
}>();

const model = defineModel<string[]>({
  default: () => ([])
});

const getCount = (filterValue: string): number | string => {
  if (
    props.filter.operation === FilterOperation.Or
    && model.value.length > 0
    && !model.value.includes(filterValue)
  ) {
    return '…';
  }

  return props.items.filter((item) => {
    const itemValue = item[props.filter.key as keyof T] as FilterableValue;

    if (!itemValue) {
      return false;
    }

    if (isObject(itemValue)) {
      return Object.keys(itemValue).includes(filterValue);
    }

    if (Array.isArray(itemValue)) {
      return itemValue.includes(filterValue);
    }

    return itemValue === filterValue;
  }).length;
};

const isDisabled = (filterValue: string, count: number | string): boolean => (
  count === 0
  && (
    props.filter.operation === FilterOperation.And
    || (
      props.filter.operation === FilterOperation.Or
      && !model.value.includes(filterValue)
    )
  )
);

const items = computed<{
  value: string,
  title: string,
  props: {
    disabled: boolean,
  },
}[]>(() => (
  props.filter.items.map((value) => {
    const count = getCount(value);

    return {
      value,
      title: `${value} (${count})`,
      props: {
        disabled: isDisabled(value, count),
      },
    };
  }))
);

watch(() => props.filter.operation, (value: FilterOperation) => {
  if (value !== FilterOperation.And) {
    return;
  }

  model.value = [];
});
</script>

<template>
  <v-autocomplete
    v-model="model"
    :items="items"
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
