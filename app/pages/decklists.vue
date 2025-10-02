<script setup lang="ts">
import type { Deck } from '~/types/deck';
import type { SortBy } from '~/types/sort';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const headers = [
  { title: 'Name', key: 'name', nowrap: true },
  { title: 'Created By', key: 'created_by', nowrap: true },
  { title: 'Created At', key: 'created_at', nowrap: true },
  { title: '', key: 'likes', nowrap: true },
];

const itemsPerPageOptions = [
  { value: 30, title: '30' },
  { value: 60, title: '60' },
];

const getRouteQueryValue = (key: string, defaultValue: string = ''): string => (
  (route.query[key] as string) || defaultValue
);

const getSortByValue = (): SortBy<Deck>[] => {
  try {
    return JSON.parse(getRouteQueryValue('sortBy', '[ { "key": "created_at", "order": "desc" } ]'));
  } catch {
    return [];
  }
};

const search = ref<string>(getRouteQueryValue('search'));
const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '30')));
const sortBys = ref<SortBy<Deck>[]>(getSortByValue());
const selectedDeck = ref<Deck | undefined>();

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
  if (selectedDeck.value) {
    return {
      id: selectedDeck.value.id,
    };
  }

  const sortByValue = JSON.stringify(sortBys.value);

  return {
    search: search.value || undefined,
    page: page.value > 1 ? page.value : undefined,
    perPage: perPage.value !== 30 ? perPage.value : undefined,
    sortBy: sortByValue !== '[]' ? sortByValue : undefined,
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
    replace: true
  });
});

const fetchDecks = async (): Promise<{ decks: Deck[], count: number }> => {
  let query = supabase
    .from('decklists')
    .select('*', { count: 'exact' })
    .range((page.value - 1) * perPage.value, (page.value * perPage.value) - 1);

  for (const sortBy of sortBys.value) {
    query = query.order(sortBy.key, {
      ascending: sortBy.order !== 'desc',
    });
  }

  const {
    data:decks,
    count,
  } = await query
    .overrideTypes<Deck[], { merge: false }>()
    .throwOnError();

  return {
    decks,
    count: count ?? 0,
  };
};

const fetchDeck = async (id: string): Promise<null | Deck> => {
  const { data } = await supabase
    .from('decklists')
    .select()
    .eq('id', id)
    .maybeSingle()
    .overrideTypes<Deck, { merge: false }>();

  return data;
};

const getDeckByRouteId = async (decks: Deck[]): Promise<null | Deck> => {
  if (!route.query.id) {
    return null;
  }

  const deck = decks.find((deck) => deck.id === route.query.id);

  if (!deck) {
    return fetchDeck(route.query.id);
  }

  return deck;
};

const {
  data,
  status
} = useAsyncData('decklists', async () => {
  const {
    decks,
    count,
  } = await fetchDecks();

  const deck = await getDeckByRouteId(decks);

  return {
    deck,
    decks,
    count,
  };
}, {
  deep: false,
  watch: [
    search,
    page,
    perPage,
    sortBys,
  ],
  default: () => ({
    deck: null,
    decks: [],
    count: 0,
  })
});

watchEffect(() => {
  if (!data.value.deck) {
    return;
  }

  selectedDeck.value = { ...data.value.deck };
});

const onClickRow = (event: Event, data: { item: Deck }) => {
  selectedDeck.value = { ...data.item };
};
</script>

<template>
  <layout-content>
    <v-data-table-server
      v-model:page="page"
      v-model:items-per-page="perPage"
      v-model:sort-by="sortBys"
      :loading="status === 'pending'"
      :headers="headers"
      :items="data.decks"
      :items-per-page-options="itemsPerPageOptions"
      :items-length="data.count"
      @click:row="onClickRow"
    >
      <template #[`item.created_at`]="{ value }">
        <date-time
          :date="value"
          format="fullDate"
        />
      </template>
      <template #[`item.likes`]="{ value }">
        <v-badge
          :model-value="value > 0"
          :content="value"
          inline
          color="grey-darken-4"
        >
          <v-icon
            :disabled="value === 0"
            icon="mdi-heart"
            color="primary"
          />
        </v-badge>
      </template>
    </v-data-table-server>
    <deck-dialog v-model="selectedDeck" />
  </layout-content>
</template>