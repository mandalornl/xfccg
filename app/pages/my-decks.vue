<script setup lang="ts">
import type { SortBy } from '~/types/sort';
import type { Deck } from '~/types/deck';

const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const {
  deckSize,
  deckState,
} = useDeckState();
const snackbarState = useSnackbarState();

useHead({
  title: 'My Decks',
});

const headers = [
  { title: '', key: 'actions', nowrap: true, width: 0, sortable: false },
  { title: 'Title', key: 'title', nowrap: true },
  { title: 'Tags', key: 'tags', nowrap: true },
  { title: 'Created At', key: 'created_at', nowrap: true },
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

const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '30')));
const sortBys = ref<SortBy<Deck>[]>(getSortByValue());
const isLoading = ref<boolean>(false);

const userId = computed<string | undefined>(() => user.value?.sub);

const {
  data,
  status,
  refresh,
} = useAsyncData('decks', async () => {
  let query = supabase
    .from('decks')
    .select('*', { count: 'exact' })
    .eq('user_id', userId.value!)
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
}, {
  deep: false,
  watch: [
    page,
    perPage,
    sortBys,
  ],
  default: () => ({
    decks: [],
    count: 0,
  }),
});

const deleteDeck = async (deck: Deck) => {
  snackbarState.reset();

  if (!confirm('Are you sure you want to delete this deck?\nThis action cannot be undone.')) {
    return;
  }

  isLoading.value = true;

  const { error } = await supabase
    .from('decks')
    .delete()
    .eq('id', deck.id!);

  if (error) {
    useDebug(error);

    snackbarState.error('An error occurred deleting the deck.');
  } else {
    snackbarState.success('Your deck has been deleted.');

    await refresh();
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};

const toggleDeckPublic = async (deck: Deck) => {
  snackbarState.reset();

  isLoading.value = true;

  const {
    data:newPublic,
    error,
  } = await supabase.rpc('toggle_deck_public', {
    p_id: deck.id!,
  });

  if (error) {
    useDebug(error);

    snackbarState.error(`An error occurred ${deck.public ? 'unpublishing' : 'publishing'} the deck.`);
  } else {
    snackbarState.success(`Your deck has been ${newPublic ? 'published' : 'unpublished'}.`);

    await refresh();
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 200);
};

const openInCards = (deck: Deck) => {
  if (
    deckSize.value > 0
    && !confirm('It looks like you\'re already working on another deck. Do you want to continue and open this one?\nAny unsaved changes will be lost.')
  ) {
    return;
  }

  deckState.value = { ...deck };

  return navigateTo('/cards');
};
</script>

<template>
  <layout-content>
    <v-data-table-server
      v-model:page="page"
      v-model:items-per-page="perPage"
      v-model:sort-by="sortBys"
      :loading="status === 'pending' || isLoading"
      :headers="headers"
      :items="data.decks"
      :items-length="data.count"
      :items-per-page-options="itemsPerPageOptions"
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
              :disabled="isLoading"
              :title="item.public ? 'Unpublish' : 'Publish'"
              @click="toggleDeckPublic(item)"
            />
            <v-list-item
              title="Open in Cards"
              @click="openInCards(item)"
            />
            <v-divider />
            <v-list-item
              base-color="error"
              title="Delete"
              @click="deleteDeck(item)"
            />
          </v-list>
        </v-menu>
      </template>
      <template #[`item.tags`]="{ value }">
        <x-tags :items="value" />
      </template>
      <template #[`item.created_at`]="{ value }">
        <date-time
          :date="value"
          format="fullDate"
        />
      </template>
    </v-data-table-server>
  </layout-content>
</template>
