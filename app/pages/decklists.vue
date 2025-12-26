<script setup lang="ts">
import type { Decklist } from '~/types/deck';
import type { SortBy } from '~/types/sort-by';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const snackbarState = useSnackbarState();
const {
  deckSize,
  setDeck,
} = useDeckState();

useHead({
  title: 'Decklists',
});

const headers = [
  { title: '', key: 'actions', nowrap: true, width: 0, sortable: false },
  { title: 'Title', key: 'title', nowrap: true },
  { title: 'Tags', key: 'tags', nowrap: true },
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

const getSortByValue = (): SortBy<Decklist>[] => {
  try {
    const sortBys = getRouteQueryValue('sortBys', '[ { "key": "created_at", "order": "desc" } ]');

    return JSON.parse(sortBys);
  } catch {
    return [];
  }
};

// TODO: Implement search or just remove it?
const search = ref<string>(getRouteQueryValue('search'));
const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '30')));
const sortBys = ref<SortBy<Decklist>[]>(getSortByValue());
const selectedDeck = ref<Decklist | undefined>();

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
  if (selectedDeck.value) {
    return {
      id: selectedDeck.value.id,
    };
  }

  return {
    search: search.value || undefined,
    page: page.value > 1 ? page.value : undefined,
    perPage: perPage.value !== 30 ? perPage.value : undefined,
    sortBys: sortBys.value.length > 0 ? JSON.stringify(sortBys.value) : undefined,
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

const fetchDecks = async (): Promise<{ decks: Decklist[], count: number }> => {
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
    .overrideTypes<Decklist[], { merge: false }>()
    .throwOnError();

  return {
    decks,
    count: count ?? 0,
  };
};

const fetchDeck = async (id: string): Promise<null | Decklist> => {
  const { data } = await supabase
    .from('decklists')
    .select()
    .eq('id', id)
    .maybeSingle()
    .overrideTypes<Decklist, { merge: false }>();

  return data;
};

const getDeckByRouteId = async (decks: Decklist[]): Promise<null | Decklist> => {
  if (!route.query.id) {
    return null;
  }

  const deck = decks.find((deck) => deck.id === route.query.id);

  if (!deck) {
    return fetchDeck(route.query.id as string);
  }

  return deck;
};

const {
  data,
  status,
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
  lazy: true,
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
  }),
});

watchEffect(() => {
  if (!data.value.deck) {
    return;
  }

  selectedDeck.value = { ...data.value.deck };
});

const openDeck = (_event: Event, data: { item: Decklist }) => {
  selectedDeck.value = { ...data.item };
};

const openInCards = (deck: Decklist) => {
  if (
    deckSize.value > 0
    && !confirm('It looks like you\'re already working on another deck. Do you want to continue and open this one?\nAny unsaved changes will be lost.')
  ) {
    return;
  }

  setDeck(deck);

  return navigateTo('/cards');
};

const shareLink = async (event: Event) => {
  try {
    const target = event.currentTarget as HTMLAnchorElement;

    await navigator.clipboard.writeText(target.href);

    snackbarState.success('Copied to clipboard.');
  } catch {
    snackbarState.error('Failed to copy to clipboard.');
  }
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
      :items-length="data.count"
      :items-per-page-options="itemsPerPageOptions"
      @click:row="openDeck"
    >
      <template #[`item.actions`]="{ item }">
        <v-menu>
          <template #activator="{ props:menuProps }">
            <v-btn
              v-tooltip:top="'Actions'"
              size="small"
              variant="text"
              icon="mdi-dots-vertical"
              v-bind="menuProps"
            />
          </template>
          <v-list>
            <v-list-item
              title="View"
              @click="selectedDeck = { ...item }"
            />
            <v-list-item
              v-if="user?.sub === item.user_id"
              :to="{ name: 'my-decks-id', params: { id: item.id } }"
              title="Edit"
            />
            <v-list-item
              title="Open in Cards"
              @click="openInCards(item)"
            />
            <v-list-item
              :href="`/decklists?id=${item.id}`"
              target="_blank"
              title="Share Link"
              @click.prevent="shareLink"
            />
          </v-list>
        </v-menu>
      </template>
      <template #[`item.created_at`]="{ value }">
        <date-time
          :date="value"
          format="fullDate"
        />
      </template>
      <template #[`item.tags`]="{ value }">
        <x-tags :items="value" />
      </template>
      <template #[`item.created_by`]="{ value, item }">
        <span :class="{ 'text-primary': item.user_id === user?.sub }">
          {{ value }}
        </span>
      </template>
      <template #[`item.likes`]="{ item }">
        <deck-toggle-like :deck="item" />
      </template>
    </v-data-table-server>
    <deck-dialog v-model="selectedDeck" />
  </layout-content>
</template>
