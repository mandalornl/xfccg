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

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
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

const {
  data,
  status
} = useAsyncData('decklists', async () => {
  let query = supabase
    .from('decklists')
    .select('*', { count: 'exact' })
    .eq('public', true)
    .range(page.value - 1, (page.value * perPage.value) - 1);

  for (const sortBy of sortBys.value) {
    query = query.order(sortBy.key, {
      ascending: sortBy.order !== 'desc',
    });
  }

  const {
    data: rows,
    count,
  } = await query
    .overrideTypes<Deck[], { merge: false }>()
    .throwOnError();

  return {
    rows,
    count: count as number,
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
    rows: [],
    count: 0,
  })
});
</script>

<template>
  <layout-content>
    <v-data-table-server
      v-model:page="page"
      v-model:items-per-page="perPage"
      v-model:sort-by="sortBys"
      :loading="status === 'pending'"
      :headers="headers"
      :items="data.rows"
      :items-per-page-options="itemsPerPageOptions"
      :items-length="data.count"
    >
      <template #[`item.created_at`]="{ value }">
        <date-time :date="value" />
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
            color="red"
          />
        </v-badge>
      </template>
    </v-data-table-server>
    <x-debug :value="sortBys" />
    <x-debug :value="data" />
  </layout-content>
</template>