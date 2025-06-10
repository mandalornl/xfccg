<script lang="ts" setup>
import sets from '~/assets/cards/sets.json';
import types from '~/assets/cards/types.json';
import keywords from '~/assets/cards/keywords.json';
import activators from '~/assets/cards/activators.json';
import rarities from '~/assets/cards/rarities.json';
import costs from '~/assets/cards/costs.json';
import episodes from '~/assets/cards/episodes.json';
import tags from '~/assets/cards/tags.json';

import type {
  Filters,
  FilterOperation,
} from '~/types/filter';
import type { Card } from '~/types/card';
import { pool } from '~/assets/cards/pool';

const route = useRoute();

const getFilterValue = (filterType: string): string[] => {
  const value = (route.query[filterType] ?? '') as string;
  const and = value.includes('+');

  return value
    .split(and ? '+' : ',')
    .filter(Boolean);
};

const getFilterOperation = (filterType: string, defaultOperation: FilterOperation): FilterOperation => {
  const value = (route.query[filterType] ?? '') as string;

  return value.includes('+') ? 'and' : defaultOperation;
};

const expandedFilters = ref<string[]>([
  'set',
  'type',
]);

const filters = ref<Filters>({
  set: {
    title: 'Set',
    value: getFilterValue('set'),
    items: sets,
    operation: getFilterOperation('set', 'and'),
  },
  type: {
    title: 'Type',
    value: getFilterValue('type'),
    items: types,
    operation: getFilterOperation('type', 'and'),
  },
  keywords: {
    title: 'Keywords',
    value: getFilterValue('keywords'),
    items: keywords,
    operation: getFilterOperation('keywords', 'and'),
  },
  activators: {
    title: 'Activators',
    value: getFilterValue('activators'),
    items: activators,
    operation: getFilterOperation('activators', 'and'),
  },
  rarity: {
    title: 'Rarity',
    value: getFilterValue('rarity'),
    items: rarities,
    operation: getFilterOperation('rarity', 'and'),
  },
  cost: {
    title: 'Cost',
    value: getFilterValue('cost'),
    items: costs,
    operation: getFilterOperation('cost', 'and'),
  },
  episode: {
    title: 'Episodes',
    value: getFilterValue('episode'),
    items: episodes,
    operation: getFilterOperation('episode', 'and'),
  },
  tag: {
    title: 'Tags',
    value: getFilterValue('tag'),
    items: tags,
    operation: getFilterOperation('tag', 'and'),
  },
});

const headers = [
  { title: '#', value: 'id', nowrap: true },
  { title: 'Set', value: 'set', nowrap: true },
  { title: 'Title', value: 'title', nowrap: true },
  { title: 'Type', value: 'type', nowrap: true },
  { title: 'Rarity', value: 'rarity', nowrap: true },
];

const search = ref<string>((route.query.q ?? '') as string);

const cards = computed<Card[]>(() => ([
  ...pool,
]));
</script>

<template>
  <layout-content fluid>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <v-card
          flat
          class="mb-3"
        >
          <v-card-text>
            <v-text-field
              :model-value="search"
              clearable
              hide-details
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              type="search"
              @click:clear="search = ''"
              @keydown.exact.enter="search = $event.target.value"
            />
          </v-card-text>
        </v-card>
        <v-switch label="Selected" />
        <v-expansion-panels
          v-model="expandedFilters"
          multiple
        >
          <v-expansion-panel
            v-for="(filter, key) of filters"
            :key="key"
            :value="key"
          >
            <v-expansion-panel-title>
              {{ filter.title }} ({{ filter.value.length }})
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <filter-operation v-model="filter.operation" />
              <filter-value
                v-model="filter.value"
                :type="key"
                :filter="filter"
                :cards="cards"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="9"
      >
        <v-data-table :headers="headers" />
      </v-col>
    </v-row>
  </layout-content>
</template>