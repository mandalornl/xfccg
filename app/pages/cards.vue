<script setup lang="ts">
import keywords from '~/assets/filters/keywords.json';
import activators from '~/assets/filters/activators.json';
import costs from '~/assets/filters/costs.json';
import episodes from '~/assets/filters/episodes.json';
import tags from '~/assets/filters/tags.json';

import {
  type Card,
  CardSet,
  CardType as CardTypeEnum,
  CardRarity,
} from '~/types/card';
import type { SortBy } from '~/types/sort';
import { FilterOperation } from '~/types/filter';

const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();
const {
  deckState,
  deckSize,
  clearDeck,
} = useDeckState();
const pool = await usePool();

useScrollPosition();

useHead({
  title: 'Cards',
});

const filters = useFilters<Card>({
  set: {
    title: 'Set',
    items: Object.values(CardSet),
  },
  type: {
    title: 'Type',
    items: Object.values(CardTypeEnum),
  },
  keywords: {
    title: 'Keywords',
    items: keywords,
  },
  activators: {
    title: 'Activators',
    items: activators,
  },
  rarity: {
    title: 'Rarity',
    items: Object.values(CardRarity),
  },
  cost: {
    title: 'Cost',
    items: costs,
  },
  episode: {
    title: 'Episodes',
    items: episodes,
  },
  tags: {
    title: 'Tags',
    items: tags,
  },
});

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

const getRouteQueryValue = (key: string, defaultValue: string = ''): string => (
  (route.query[key] as string) || defaultValue
);

const getSortByValue = (): SortBy<Card>[] => {
  try {
    return JSON.parse(getRouteQueryValue('sortBy', '[]'));
  } catch {
    return [];
  }
};

const getSelectedCard = (): Card | undefined => {
  if (!route.query.id) {
    return undefined;
  }

  return pool.find((card) => card.id === route.query.id);
};

const search = ref<string>(getRouteQueryValue('search'));
const view = ref<string>(getRouteQueryValue('view', 'grid'));
const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '60')));
const sortBys = ref<SortBy<Card>[]>(getSortByValue());
const inDeck = ref<boolean>(false);
const selectedCard = ref<Card | undefined>(getSelectedCard());
const showStatisticsDialog = ref<boolean>(false);
const showSaveDeckDialog = ref<boolean>(false);

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
  if (selectedCard.value) {
    return {
      id: selectedCard.value.id,
    };
  }

  const sortByValue = JSON.stringify(sortBys.value);

  return {
    search: search.value || undefined,
    view: view.value !== 'grid' ? view.value : undefined,
    page: page.value > 1 ? page.value : undefined,
    perPage: perPage.value !== 60 ? perPage.value : undefined,
    sortBy: sortByValue !== '[]' ? sortByValue : undefined,
    ...Object.fromEntries(
      filters.value.map((filter) => ([
        filter.key,
        filter.value.length > 0
          ? filter.value.join(filter.operation === FilterOperation.And ? '+' : ',')
          : undefined,
      ]))
    ),
  };
});

watch(routeQuery, (query) => {
  const resolvedRoute = router.resolve({
    query,
  });

  if (resolvedRoute.fullPath === route.fullPath) {
    return;
  }

  return navigateTo(resolvedRoute, {
    replace: true,
  });
});

watch([
  search,
  filters,
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
        .some((value) => value?.toLowerCase().includes(search.value.toLowerCase()));

      if (!hit) {
        return false;
      }
    }

    if (inDeck.value && !deckState.value.card_ids[card.id]) {
      return false;
    }

    return useHasFilters<Card>(filters, card);
  });

  if (sortBys.value.length > 0) {
    const compare = useSort<Card>(sortBys.value);

    return hits.sort(compare);
  }

  return hits;
});

watch(deckSize, (value) => {
  if (value > 0) {
    return;
  }

  inDeck.value = false;
});

const onClickRow = (event: Event, data: { item: Card }) => {
  selectedCard.value = { ...data.item };
};

const selectedIndex = computed<number>(() => {
  if (!selectedCard.value) {
    return -1;
  }

  return cards.value.findIndex((card) => card.id === selectedCard.value?.id);
});

watch(selectedIndex, (value) => {
  if (value === -1) {
    return;
  }

  page.value = Math.floor(value / perPage.value) + 1;
});

const onKeyup = (event: KeyboardEvent) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  if (
    selectedIndex.value === -1
    || selectedIndex.value === cards.value.length - 1
  ) {
    return;
  }

  event.preventDefault();

  const delta = event.key === 'ArrowLeft' ? -1 : 1;
  const index = selectedIndex.value + delta;
  const card = cards.value[index];

  if (!card) {
    return;
  }

  selectedCard.value = { ...card };
};

onMounted(() => {
  window.addEventListener('keyup', onKeyup);
});

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup);
});
</script>

<template>
  <layout-content fluid>
    <card-toolbar v-model:search="search">
      <v-btn-toggle
        v-model="view"
        mandatory
        variant="text"
        color="primary"
      >
        <v-btn
          v-tooltip:top="'Grid View'"
          value="grid"
          icon="mdi-view-grid"
        />
        <v-btn
          v-tooltip:top="'List View'"
          value="list"
          icon="mdi-view-list"
        />
      </v-btn-toggle>
      <filter-dialog
        v-model="filters"
        :items="cards"
      />
      <v-badge
        :model-value="deckSize > 0"
        :content="deckSize"
        color="primary"
      >
        <v-menu>
          <template #activator="{ props:menuProps }">
            <v-btn
              v-tooltip:top="'Actions'"
              :disabled="deckSize === 0"
              rounded
              icon="mdi-dots-vertical"
              v-bind="menuProps"
            />
          </template>
          <v-list>
            <v-list-item
              title="In Deck"
              @click="inDeck = !inDeck"
            >
              <template #prepend>
                <v-switch
                  :model-value="inDeck"
                  hide-details
                  class="mr-2"
                />
              </template>
            </v-list-item>
            <v-divider />
            <v-list-item
              v-if="user"
              title="Save Deck"
              @click="showSaveDeckDialog = true"
            />
            <v-list-item
              title="Show Statistics"
              @click="showStatisticsDialog = true"
            />
            <v-divider />
            <v-list-item
              :disabled="deckSize === 0"
              title="Clear Deck"
              base-color="error"
              @click="clearDeck"
            />
          </v-list>
        </v-menu>
      </v-badge>
    </card-toolbar>
    <v-data-iterator
      v-if="view === 'grid'"
      v-model:page="page"
      v-model:items-per-page="perPage"
      :items="cards"
      class="bg-grey-darken-4"
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
            <v-card
              variant="flat"
              @click="selectedCard = { ...item.raw }"
            >
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
              <v-card-actions v-if="item.raw.type !== CardTypeEnum.Credits">
                <v-spacer />
                # In deck
                <input-in-deck :card="item.raw" />
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
      v-model:sort-by="sortBys"
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
      <template #[`item.inDeck`]="{ item }">
        <input-in-deck
          v-if="item.type !== CardTypeEnum.Credits"
          :card="item"
        />
      </template>
    </v-data-table>
    <card-dialog v-model="selectedCard" />
    <deck-statistics-dialog
      v-model="showStatisticsDialog"
      :deck="deckState"
    />
    <save-deck-dialog v-model="showSaveDeckDialog" />
  </layout-content>
</template>
