<script lang="ts" setup>
import type {
  Filter,
  FilterOperation,
} from '~/types/filter';
import type { Card } from '~/types/card';

const props = defineProps<{
  filter: Filter,
  type: string | number,
  cards: Array<Card>,
}>();

const model = defineModel<string[]>({
  default: () => ([])
});

const getCount = (value: string): number | string => {
  if (
    props.filter.operation === 'or'
    && model.value.length > 0
    && !model.value.includes(value)
  ) {
    return '…';
  }

  return props.cards.filter((card: Card) => {
    const cardValue = card[props.type as keyof Card];

    if (Array.isArray(cardValue)) {
      return cardValue.includes(value);
    }

    return cardValue === value;
  }).length;
};

const mapItems = (value: string): {
  value: string,
  disabled: boolean,
  count: number | string,
} => {
  return {
    value,
    count: getCount(value),
    disabled: false,
  };
};

const primaryItems = computed(() => (
  props.filter.items
    .slice(0, 5)
    .map(mapItems)
));

const secondaryItems = computed(() => (
  props.filter.items
    .slice(5)
    .map(mapItems)
));

const isExpanded = ref(false);

watch(() => props.filter.operation, (value: FilterOperation) => {
  if (value !== 'and') {
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