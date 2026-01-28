<script setup lang="ts">
import keywords from '~/assets/filters/keywords.json';
import activators from '~/assets/filters/activators.json';
import costs from '~/assets/filters/costs.json';
import episodes from '~/assets/filters/episodes.json';
import tags from '~/assets/filters/tags.json';

import { useLocale } from 'vuetify/framework';

import {
  type Card,
  CardRarity,
  CardSet,
  CardType as CardTypeEnum,
} from '~/types/card';
import type { SortBy } from '~/types/sort-by';
import { FilterOperation } from '~/types/filter';
import type { Deck } from '~/types/deck';

const route = useRoute();
const router = useRouter();
const { t } = useLocale();
const {
  deckState,
  deckSize,
  clearDeck,
} = useDeckState();
const pool = await usePool();

useHead({
  title: 'Cards',
});

const filters = useFilters<Card>([
  {
    key: 'set',
    title: 'Set',
    items: Object.values(CardSet),
  },
  {
    key: 'type',
    title: 'Type',
    items: Object.values(CardTypeEnum),
  },
  {
    key: 'keywords',
    title: 'Keywords',
    items: keywords,
    multiple: true,
  },
  {
    key: 'activators',
    title: 'Activators',
    items: activators,
    multiple: true,
  },
  {
    key: 'rarity',
    title: 'Rarity',
    items: Object.values(CardRarity),
  },
  {
    key: 'cost',
    title: 'Cost',
    items: costs,
  },
  {
    key: 'episode',
    title: 'Episode',
    items: episodes,
  },
  {
    key: 'tags',
    title: 'Tags',
    items: tags,
    multiple: true,
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

const getSortByValue = (): SortBy<Card>[] => {
  try {
    const sortBys = route.query.sortBys as string || '[]';

    return JSON.parse(sortBys);
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

const search = ref<string>(route.query.search as string || '');
const view = ref<string>(route.query.view as string || 'grid');
const page = ref<number>(Number(route.query.page as string || 1));
const perPage = ref<number>(Number(route.query.perPage as string || 60));
const sortBys = ref<SortBy<Card>[]>(getSortByValue());
const inDeck = ref<boolean>(false);
const selectedCard = ref<Card | undefined>(getSelectedCard());
const selectedDeck = ref<Deck>();

const routeQuery = computed<Record<string, string | number | undefined>>(() => {
  if (selectedCard.value) {
    return {
      id: selectedCard.value.id,
    };
  }

  const selectedFilters = JSON.stringify(
    Object.fromEntries(
      filters.value
        .filter((filter) => filter.value.length > 0)
        .map((filter) => ([
          filter.key,
          filter.value.join(filter.operation === FilterOperation.And ? '+' : ',')
        ]))
    )
  );

  return {
    search: search.value || undefined,
    view: view.value !== 'grid' ? view.value : undefined,
    page: page.value > 1 ? page.value : undefined,
    perPage: perPage.value !== 60 ? perPage.value : undefined,
    sortBys: sortBys.value.length > 0 ? JSON.stringify(sortBys.value) : undefined,
    filters: selectedFilters !== '{}' ? selectedFilters : undefined,
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
    const compare = useSortBy<Card>(sortBys.value);

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

const openCard = (_event: Event, data: { item: Card }) => {
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

const clearSelection = () => {
  if (!confirm('Are you sure you want to clear the selection?\nThis action cannot be undone.')) {
    return;
  }

  clearDeck();
};
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
              title="View Deck"
              @click="selectedDeck = { ...deckState }"
            />
            <v-divider />
            <v-list-item
              :disabled="deckSize === 0"
              title="Clear Selection"
              base-color="error"
              @click="clearSelection"
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
        <v-row no-gutters>
          <v-col
            v-for="item of items"
            :key="item.raw.id"
            cols="6"
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
      <template #no-data>
        <div class="pa-4">
          {{ t('$vuetify.noDataText') }}
        </div>
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
      @click:row="openCard"
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
    <deck-dialog v-model="selectedDeck" />
  </layout-content>
</template>
