<script setup lang="ts">
import type { Deck } from '~/types/deck';

const route = useRoute();
const supabase = useSupabaseClient();

const headers = [
  { title: 'Name', value: 'name', nowrap: true },
  { title: 'Created By', value: 'profile.full_name', nowrap: true },
  { title: 'Created At', value: 'created_at', nowrap: true },
];

const itemsPerPageOptions = [
  { value: 10, title: '30' },
  { value: 60, title: '60' },
];

const getRouteQueryValue = (key: string, defaultValue: string = ''): string => (
  (route.query[key] as string) || defaultValue
);

// const search = ref<string>(getRouteQueryValue('search'));
const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '30')));

const {
  data,
  status
} = useAsyncData('decklists', async () => {
  const {
    data: rows,
    count,
  } = await supabase
    .from('decks')
    .select('*, profile:profile_id(full_name)', { count: 'exact' })
    .eq('public', true)
    .range(page.value - 1, (page.value * perPage.value) - 1)
    .overrideTypes<Deck[], { merge: false }>()
    .throwOnError();

  return {
    rows,
    count: count as number,
  };
}, {
  deep: false,
  watch: [
    page,
    perPage,
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
      :loading="status === 'pending'"
      :headers="headers"
      :items="data.rows"
      :items-per-page-options="itemsPerPageOptions"
      :items-length="data.count"
    >
      <template #[`item.created_at`]="{ value }">
        <date-time :value="value" />
      </template>
    </v-data-table-server>
    <x-debug :value="data" />
  </layout-content>
</template>