<script setup lang="ts" generic="T">
import { useDisplay } from 'vuetify';
import {
  type DataTableFilter,
  DataTableFilterOperation,
  type DataTableFilters,
} from '~/types/datatable';
import type { Entries } from '~/types/object';

const { xs } = useDisplay();

const props = defineProps<{
  filters: DataTableFilter<T>[],
  items: T[],
}>();

const model = defineModel<DataTableFilters<T>>({
  default: () => ({}),
});

const isOpen = ref<boolean>(false);

const activeFilters = computed<number>(() => (
  (Object.entries(model.value) as Entries<DataTableFilters<T>>).filter(([ , filter ]) => filter.value.length > 0).length
));

const clearFilters = () => {
  for (const filter of props.filters) {
    model.value[filter.key] = {
      value: [],
      operation: DataTableFilterOperation.Or,
    };
  }
};
</script>

<template>
  <v-dialog
    v-model="isOpen"
    :fullscreen="xs"
    scrollable
    width="600"
  >
    <template #activator="{ props:dialogProps }">
      <v-badge
        :model-value="activeFilters > 0"
        :content="activeFilters"
        color="primary"
      >
        <v-btn
          v-tooltip:top="'Filters'"
          :active="activeFilters > 0"
          rounded
          variant="text"
          active-color="primary"
          icon="mdi-filter-variant"
          v-bind="dialogProps"
        />
      </v-badge>
    </template>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        Filters
        <v-btn
          v-tooltip:top="'Close'"
          variant="text"
          icon="mdi-close"
          size="small"
          @click="isOpen = false"
        />
      </v-card-title>
      <v-card-text class="text-body-1">
        <v-row
          v-for="filter of filters"
          :key="filter.key"
        >
          <v-col>
            <v-autocomplete
              v-model="model[filter.key].value"
              :items="filter.items"
              :label="filter.title"
              chips
              multiple
              clearable
              closable-chips
              auto-select-first
              hide-selected
              hide-details
              variant="outlined"
              autocomplete="off"
              placeholder="Type to search"
            />
          </v-col>
          <v-col
            v-if="filter.multiple"
            cols="auto"
          >
            <v-select
              v-model="model[filter.key].operation"
              :items="[
                DataTableFilterOperation.Or,
                DataTableFilterOperation.And,
              ]"
              hide-details
              min-width="100"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="activeFilters === 0"
          variant="text"
          text="Clear filters"
          @click="clearFilters"
        />
        <v-btn
          variant="flat"
          color="primary"
          text="Close"
          @click="isOpen = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
