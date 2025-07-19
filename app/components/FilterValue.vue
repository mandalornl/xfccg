<script lang="ts" setup>
import type {
  Filter,
  Filterable,
} from '~/types/filter';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

const props = defineProps<{
  filter: Filter,
  items: Filterable[],
}>();

const model = defineModel<string[]>({
  default: () => ([])
});

const getCount = (filterValue: string): number | string => {
  if (
    props.filter.operation === FilterOperationEnum.OR
    && model.value.length > 0
    && !model.value.includes(filterValue)
  ) {
    return '…';
  }

  return props.items.filter((item: Filterable) => {
    const itemValue = item[props.filter.key];

    if (Array.isArray(itemValue)) {
      return itemValue.includes(filterValue);
    }

    return itemValue === filterValue;
  }).length;
};

const isDisabled = (filterValue: string, count: number | string): boolean => (
  count === 0
  && (
    props.filter.operation === FilterOperationEnum.AND
    || (
      props.filter.operation === FilterOperationEnum.OR
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

watch(() => props.filter.operation, (value: FilterOperationEnum) => {
  if (value !== FilterOperationEnum.AND) {
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
