<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import type {
  Filter,
  Filterable,
} from '~/types/filter';
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

const { smAndDown } = useDisplay();

defineProps<{
  items: Filterable[],
}>();

const filters = defineModel<Filter[]>({
  default: () => ([]),
});

const dialog = ref<boolean>(false);

const activeFilters = computed<number>(() => filters.value.filter((filter) => filter.value.length > 0).length);

const clearFilters = () => {
  for (const filter of filters.value) {
    filter.value = [];
    filter.operation = FilterOperationEnum.AND;
  }
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="smAndDown"
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
          :active="activeFilters > 0"
          rounded
          active-color="primary"
          icon="mdi-filter-variant"
          title="Filters"
          v-bind="dialogProps"
        />
      </v-badge>
    </template>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        Filters
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          title="Close"
          @click="dialog = false"
        />
      </v-card-title>
      <v-card-text class="text-body-1">
        <v-row
          v-for="filter of filters"
          :key="filter.key"
        >
          <v-col>
            <filter-value
              v-model="filter.value"
              :filter="filter"
              :items="items"
            />
          </v-col>
          <v-col cols="auto">
            <filter-operation v-model="filter.operation" />
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
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>