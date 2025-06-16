<script lang="ts" setup>
import type { RouteLocationResolvedGeneric } from 'vue-router';
import { useGoTo } from 'vuetify';

import sets from '~/assets/cards/sets.json';
import types from '~/assets/cards/types.json';
import keywords from '~/assets/cards/keywords.json';
import activators from '~/assets/cards/activators.json';
import rarities from '~/assets/cards/rarities.json';
import costs from '~/assets/cards/costs.json';
import episodes from '~/assets/cards/episodes.json';
import tags from '~/assets/cards/tags.json';

import type { Filter } from '~/types/filter';
import type { Card } from '~/types/card';
import type { SortBy } from '~/types/sort';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';
import { sortCompare } from '~/utils/sort-compare';
import { pool } from '~/assets/cards/pool';

const route = useRoute();
const router = useRouter();
const goTo = useGoTo();

useHead({
  title: 'Cards'
});

const getFilterValue = (key: string): string[] => {
  const value = (route.query[key] ?? '') as string;
  const and = value.includes('+');

  return value
    .split(and ? '+' : ',')
    .filter(Boolean);
};

const getFilterOperation = (key: string, defaultOperation: FilterOperationEnum = FilterOperationEnum.AND): FilterOperationEnum => {
  const value = (route.query[key] ?? '') as string;

  return value.includes('+') ? FilterOperationEnum.AND : defaultOperation;
};

const expandedFilters = ref<string[]>([
  'set',
  'type',
]);

const filters = ref<Filter[]>([
  {
    key: 'set',
    title: 'Set',
    value: getFilterValue('set'),
    items: sets,
    operation: getFilterOperation('set'),
  },
  {
    key: 'type',
    title: 'Type',
    value: getFilterValue('type'),
    items: types,
    operation: getFilterOperation('type'),
  },
  {
    key: 'keywords',
    title: 'Keywords',
    value: getFilterValue('keywords'),
    items: keywords,
    operation: getFilterOperation('keywords'),
  },
  {
    key: 'activators',
    title: 'Activators',
    value: getFilterValue('activators'),
    items: activators,
    operation: getFilterOperation('activators'),
  },
  {
    key: 'rarity',
    title: 'Rarity',
    value: getFilterValue('rarity'),
    items: rarities,
    operation: getFilterOperation('rarity'),
  },
  {
    key: 'cost',
    title: 'Cost',
    value: getFilterValue('cost'),
    items: costs,
    operation: getFilterOperation('cost'),
  },
  {
    key: 'episode',
    title: 'Episodes',
    value: getFilterValue('episode'),
    items: episodes,
    operation: getFilterOperation('episode'),
  },
  {
    key: 'tags',
    title: 'Tags',
    value: getFilterValue('tags'),
    items: tags,
    operation: getFilterOperation('tags'),
  },
]);

const hasAnyFilters = computed(() => filters.value.some((filter) => filter.value.length > 0));

const clearAllFilters = () => {
  for (const filter of filters.value) {
    filter.value = [];
  }
};

const headers = [
  { title: '#', key: 'id', nowrap: true },
  { title: 'Set', key: 'set', nowrap: true },
  { title: 'Title', key: 'title', nowrap: true },
  { title: 'Type', key: 'type', nowrap: true },
  { title: 'Rarity', key: 'rarity', nowrap: true },
];

const itemsPerPageOptions = [
  { value: 60, title: '60' },
  { value: 120, title: '120' },
  { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
];

const getSortByValue = (): SortBy[] => {
  try {
    return JSON.parse((route.query.sortBy ?? '[]') as string);
  } catch {
    return [];
  }
};

const search = ref<string>((route.query.search || '') as string);
const page = ref<number>(Number((route.query.page ?? '1') as string));
const perPage = ref<number>(Number((route.query.perPage ?? '60') as string));
const sortBy = ref<SortBy[]>(getSortByValue());
const showSelected = ref<boolean>(route.query.showSelected === null);
const selectedCard = ref<Card | null>(null);

const resolvedRoute = computed(() => {
  const sortByValue = JSON.stringify(sortBy.value);

  return router.resolve({
    query: {
      id: selectedCard.value?.id,
      search: search.value || undefined,
      page: page.value > 1 ? page.value : undefined,
      perPage: perPage.value !== 60 ? perPage.value : undefined,
      sortBy: sortByValue !== '[]' ? sortByValue : undefined,
      showSelected: showSelected.value ? null : undefined,
      ...Object.fromEntries(
        filters.value.map((filter) => ([
          filter.key,
          filter.value.length > 0
            ? filter.value.join(filter.operation === FilterOperationEnum.AND ? '+' : ',')
            : undefined,
        ]))
      ),
    }
  });
});

watch(resolvedRoute, (value: RouteLocationResolvedGeneric) => {
  if (value.fullPath === route.fullPath) {
    return;
  }

  return navigateTo(value, {
    replace: true
  });
});

watch(search, () => {
  page.value = 1;
});

const cards = computed<Card[]>(() => {
  const canonicalSearch = search.value.toLocaleLowerCase();

  const hits = pool.filter((card: Card) => {
    if (canonicalSearch) {
      const hit = [
        card.id,
        card.title,
        card.gameText,
        card.gameEffect,
      ]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase().includes(canonicalSearch));

      if (!hit) {
        return false;
      }
    }

    // TODO: showSelected && quantityInDeck[card.id] === 0 then return false.

    return filters.value.every((filter) => {
      if (filter.value.length === 0) {
        return true;
      }

      const cardValue = card[filter.key];

      if (Array.isArray(cardValue)) {
        if (filter.operation === FilterOperationEnum.AND) {
          return filter.value.every((value) => cardValue.includes(value));
        }

        return filter.value.some((value) => cardValue.includes(value));
      }

      return filter.value.includes(cardValue);
    });
  });

  if (sortBy.value.length > 0) {
    return hits.sort(sortCompare(sortBy.value));
  }

  return hits;
});

const items = computed(() => {
  if (perPage.value > 0) {
    return cards.value.slice((page.value - 1) * perPage.value, page.value * perPage.value);
  }

  return cards.value;
});

const deckSize = ref<number>(0);
const isIntersecting = ref<boolean>(false);

const onClickRow = (event: Event, data: { item: Card }) => {
  selectedCard.value = data.item;
};
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
              @focus="$event.target.select()"
              @keydown.exact.enter="search = $event.target.value"
            />
          </v-card-text>
        </v-card>
        <v-switch
          v-model="showSelected"
          :disabled="deckSize === 0"
        >
          <template #label>
            Selected
            <v-badge
              :model-value="deckSize > 0"
              :content="deckSize"
              inline
              color="primary"
            />
          </template>
        </v-switch>
        <v-expand-transition>
          <div v-if="hasAnyFilters">
            <v-btn
              variant="tonal"
              size="small"
              text="Clear all filters"
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
        <v-data-table-server
          v-model:sort-by="sortBy"
          v-model:items-per-page="perPage"
          v-intersect="{
            handler: ($event: boolean) => isIntersecting = $event,
            options: {
              rootMargin: '-64px 0px 0px',
            }
          }"
          :headers="headers"
          :items="items"
          :items-length="cards.length"
          :items-per-page-options="itemsPerPageOptions"
          @click:row="onClickRow"
        >
          <template #[`item.type`]="{ value }">
            <card-type
              v-if="value"
              :text="value"
            />
          </template>
        </v-data-table-server>
        <v-fade-transition>
          <div
            v-if="!isIntersecting"
            class="position-sticky top-50 left-0 right-0"
          >
            <v-btn
              variant="tonal"
              class="d-block mx-auto"
              @click="goTo(0)"
            >
              {{ cards.length }} {{ cards.length === 1 ? 'result' : 'results' }} found
              <v-icon
                icon="mdi-arrow-up"
                class="ml-2"
              />
            </v-btn>
          </div>
        </v-fade-transition>
      </v-col>
    </v-row>
  </layout-content>
</template>

<style lang="scss" scoped>
.top-50 {
  top: 50%;
}
</style>