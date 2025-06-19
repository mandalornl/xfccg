<script lang="ts" setup>
import type {
  Filter,
  FilterValueItem
} from '~/types/filter';
import type { Card } from '~/types/card';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

const props = defineProps<{
  filter: Filter,
  cards: Card[],
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

  return props.cards.filter((card: Card) => {
    const cardValue = card[props.filter.key];

    if (Array.isArray(cardValue)) {
      return cardValue.includes(filterValue);
    }

    return cardValue === filterValue;
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

const getItem = (value: string): FilterValueItem => {
  const count = getCount(value);

  return {
    value,
    count,
    disabled: isDisabled(value, count),
  };
};

const primaryItems = computed<FilterValueItem[]>(() => (
  props.filter.items
    .slice(0, 5)
    .map(getItem)
));

const secondaryItems = computed<FilterValueItem[]>(() => (
  props.filter.items
    .slice(5)
    .map(getItem)
));

const isExpanded = ref(false);

watch(() => props.filter.operation, (value: FilterOperationEnum) => {
  if (value !== FilterOperationEnum.AND) {
    return;
  }

  model.value = [];
});
</script>

<template>
  <v-checkbox
    v-for="item of primaryItems"
    :key="item.value"
    v-model="model"
    :disabled="item.disabled"
    :value="item.value"
    :label="`${item.value} (${item.count})`"
    hide-details
  />
  <template v-if="secondaryItems.length > 0">
    <v-expand-transition>
      <div v-if="isExpanded">
        <v-checkbox
          v-for="item of secondaryItems"
          :key="item.value"
          v-model="model"
          :disabled="item.disabled"
          :value="item.value"
          :label="`${item.value} (${item.count})`"
          hide-details
        />
      </div>
    </v-expand-transition>
    <v-switch
      v-model="isExpanded"
      :label="isExpanded ? 'Show less' : `Show ${secondaryItems.length} more`"
      hide-details
    />
  </template>
  <v-btn
    :disabled="model.length === 0"
    variant="tonal"
    size="small"
    text="Clear"
    @click="model = []"
  />
</template>
