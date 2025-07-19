<script lang="ts" setup>
import type { RouteLocationResolvedGeneric } from 'vue-router';

import sets from '~/assets/filters/sets.json';
import types from '~/assets/filters/types.json';
import keywords from '~/assets/filters/keywords.json';
import activators from '~/assets/filters/activators.json';
import rarities from '~/assets/filters/rarities.json';
import costs from '~/assets/filters/costs.json';
import episodes from '~/assets/filters/episodes.json';
import tags from '~/assets/filters/tags.json';

import type { Filter } from '~/types/filter';
import type { Card } from '~/types/card';
import type { SortBy } from '~/types/sort';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';
import { sortCompare } from '~/utils/sort-compare';
import { pool } from '~/assets/cards/pool';

const route = useRoute();
const router = useRouter();

useHead({
  title: 'Cards',
});

const filters = ref<Filter[]>([
  {
    key: 'set',
    title: 'Set',
    value: [],
    items: sets,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'type',
    title: 'Type',
    value: [],
    items: types,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'keywords',
    title: 'Keywords',
    value: [],
    items: keywords,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'activators',
    title: 'Activators',
    value: [],
    items: activators,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'rarity',
    title: 'Rarity',
    value: [],
    items: rarities,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'cost',
    title: 'Cost',
    value: [],
    items: costs,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'episode',
    title: 'Episodes',
    value: [],
    items: episodes,
    operation: FilterOperationEnum.AND,
  },
  {
    key: 'tags',
    title: 'Tags',
    value: [],
    items: tags,
    operation: FilterOperationEnum.AND,
  },
]);

const headers = [
  { title: '#', key: 'id', nowrap: true },
  { title: 'Title', key: 'title', nowrap: true },
  { title: 'Set', key: 'set', nowrap: true },
  { title: 'Type', key: 'type', nowrap: true },
  { title: 'Rarity', key: 'rarity', nowrap: true },
  { title: '# In deck', key: 'inDeck', nowrap: true, sortable: false },
];

const itemsPerPageOptions = [
  { value: 60, title: '60' },
  { value: 120, title: '120' },
  { value: 240, title: '240' },
];

const getSortByValue = (): SortBy[] => {
  try {
    return JSON.parse((route.query.sortBy ?? '[]') as string);
  } catch {
    return [];
  }
};

const search = ref<string>((route.query.search || '') as string);
const view = ref<string>((route.query.view ?? 'list') as string);
const page = ref<number>(Number((route.query.page ?? '1') as string));
const perPage = ref<number>(Number((route.query.perPage ?? '60') as string));
const sortBy = ref<SortBy[]>(getSortByValue());
const inDeck = ref<boolean>(route.query.inDeck === null);

const resolvedRoute = computed(() => {
  const sortByValue = JSON.stringify(sortBy.value);

  return router.resolve({
    name: 'cards',
    query: {
      search: search.value || undefined,
      view: view.value !== 'list' ? view.value : undefined,
      page: page.value > 1 ? page.value : undefined,
      perPage: perPage.value !== 60 ? perPage.value : undefined,
      sortBy: sortByValue !== '[]' ? sortByValue : undefined,
      inDeck: inDeck.value ? null : undefined,
      ...Object.fromEntries(
        filters.value.map((filter) => ([
          filter.key,
          filter.value.length > 0
            ? filter.value.join(filter.operation === FilterOperationEnum.AND ? '+' : ',')
            : undefined,
        ]))
      ),
    },
  });
});

watch(resolvedRoute, (value: RouteLocationResolvedGeneric) => {
  if (route.name === 'cards-id') {
    return;
  }

  if (value.fullPath === route.fullPath) {
    return;
  }

  return navigateTo(value, {
    replace: true
  });
});

watch([
  search,
  filters,
  view,
], () => {
  page.value = 1;
}, {
  deep: true,
});

const cards = computed<Card[]>(() => {
  const hits = pool.filter((card) => {
    if (search.value) {
      const hit = [
        card.id,
        card.title,
        card.gameEffect,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search.value.toLowerCase()));

      if (!hit) {
        return false;
      }
    }

    // TODO: query.inDeck && inDeck[card.id] === 0 then return false.

    return filters.value.every((filter) => {
      if (filter.value.length === 0) {
        return true;
      }

      const cardValue = card[filter.key] as string;

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

const deckSize = ref<number>(0);

const onClickRow = (event: Event, data: { item: Card }) => (
  navigateTo({
    name: 'cards-id',
    params: {
      id: data.item?.id,
    },
  })
);

const updateFilter = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  search.value = '';

  for (const filter of filters.value) {
    filter.value = filter.key === key ? [ value ] : [];
  }

  return navigateTo('/cards');
};
</script>

<template>
  <layout-content fluid>
    <v-card
      flat
      class="mb-4"
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
      <v-card-actions class="flex-wrap">
        <v-btn-toggle
          v-model="view"
          mandatory
          variant="tonal"
          color="primary"
        >
          <v-btn
            value="list"
            icon="mdi-view-list"
          />
          <v-btn
            value="grid"
            icon="mdi-view-grid"
          />
        </v-btn-toggle>
        <filter-dialog
          v-model="filters"
          :items="cards"
        />
        <!--<v-btn-group variant="tonal">
          <v-btn
            size="small"
            icon="mdi-floppy"
            title="Save deck"
          />
          <v-btn
            size="small"
            icon="mdi-chart-line"
            title="Show stats"
          />
          <v-btn
            size="small"
            icon="mdi-cards"
            title="Draw opening hand"
          />
          <v-btn
            size="small"
            icon="mdi-link-variant"
            title="Copy deck URL to clipboard"
          />
          <v-btn
            size="small"
            icon="mdi-sync"
            title="Reset deck"
          />
        </v-btn-group>-->
        <v-spacer />
        <v-switch
          v-model="inDeck"
          :disabled="deckSize === 0"
          hide-details
          density="compact"
          class="ml-3"
        >
          <template #label>
            In deck
            <v-badge
              :model-value="deckSize > 0"
              :content="deckSize"
              inline
              color="primary"
            />
          </template>
        </v-switch>
      </v-card-actions>
    </v-card>
    <v-data-iterator
      v-if="view === 'grid'"
      :items="cards"
      :items-per-page="perPage"
    >
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item of items"
            :key="item.raw.id"
            cols="12"
            sm="4"
            md="3"
            lg="2"
          >
            <v-card :to="{ name: 'cards-id', params: { id: item.raw.id } }">
              <v-card-item>
                <v-card-title>
                  {{ item.raw.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ item.raw.id }}
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                <card-image :card="item.raw" />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <span class="pr-2">
                  # In deck:
                </span>
                <v-number-input
                  :model-value="0"
                  :min="0"
                  :max="2"
                  inset
                  hide-details
                  max-width="80"
                  color="primary"
                  base-color="primary"
                  variant="outlined"
                  density="compact"
                  control-variant="stacked"
                  @click.stop
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template #footer="footerProps">
        <v-data-table-footer
          v-bind="footerProps"
          :items-per-page-options="itemsPerPageOptions"
        />
      </template>
    </v-data-iterator>
    <v-data-table
      v-else
      v-model:page="page"
      v-model:items-per-page="perPage"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="cards"
      :items-per-page-options="itemsPerPageOptions"
      @click:row="onClickRow"
    >
      <template #[`item.type`]="{ value }">
        <card-type
          v-if="value"
          :text="value"
        />
      </template>
      <template #[`item.inDeck`]>
        <v-number-input
          :model-value="0"
          :min="0"
          :max="2"
          inset
          hide-details
          width="80"
          color="primary"
          base-color="primary"
          variant="outlined"
          density="compact"
          control-variant="stacked"
          @click.stop
        />
      </template>
    </v-data-table>
    <nuxt-page @click:filter="updateFilter" />
  </layout-content>
</template>

<style lang="scss" scoped>
.top-50 {
  top: 50%;
}
</style>