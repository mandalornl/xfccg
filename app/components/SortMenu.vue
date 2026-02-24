<script setup lang="ts" generic="T">
import type { SortBy } from '~/types/sort-by';

const props = defineProps<{
  items: {
    title: string;
    key: string;
    sortable?: boolean;
  }[];
}>();

const model = defineModel<SortBy<T>[]>({
  default: () => ([]),
});

const sortableItems = computed<{
  title: string;
  value: string;
}[]>(() => (
  props.items
    .filter((item) => item.sortable === undefined || item.sortable)
    .flatMap(({
      title,
      key,
    }) => ([
      {
        title: `${title} (Ascending)`,
        value: `${key}:asc`,
      },
      {
        title: `${title} (Descending)`,
        value: `${key}:desc`,
      },
    ]))
));

const proxiedModel = computed({
  get: () => (
    model.value.map((item) => `${item.key as string}:${item.order}`)
  ),
  set: (values) => {
    model.value = values.map((value) => {
      const [
        key,
        order,
      ] = value.split(':');

      return {
        key,
        order,
      };
    }) as SortBy<T>[];
  },
});

const icon = computed<string>(() => {
  if (model.value.length === 0) {
    return 'mdi-sort';
  }

  const isDescending = model.value.some((item) => item.order === 'desc');

  if (isDescending) {
    return 'mdi-sort-descending';
  }

  return 'mdi-sort-ascending';
});
</script>

<template>
  <v-menu eager>
    <template #activator="{ props: menuProps }">
      <v-btn
        v-tooltip:top="'Sort'"
        :active="proxiedModel.length > 0"
        :icon="icon"
        rounded
        active-color="primary"
        variant="text"
        v-bind="menuProps"
      />
    </template>
    <v-list
      v-model:selected="proxiedModel"
      :items="sortableItems"
      selectable
    />
  </v-menu>
</template>
