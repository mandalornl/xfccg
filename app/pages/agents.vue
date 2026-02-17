<script setup lang="ts">
import { useLocale } from 'vuetify/framework';

import {
  type Card,
  CardSet,
  CardType,
} from '~/types/card';
import type { Agent } from '~/types/agent';
import type { DataTableFilter } from '~/types/datatable';
import { InvestigationSkill } from '~/types/skill';

const route = useRoute();
const router = useRouter();
const { t } = useLocale();
const teambuilder = useTeambuilder();
const pool = await usePool();

useHead({
  title: 'Agents',
});

const filters: DataTableFilter<Agent>[] = [
  {
    key: 'skills',
    title: 'Skills',
    items: Object.values(InvestigationSkill),
    multiple: true,
  },
  {
    key: 'cost',
    title: 'Cost',
    items: Array.from({ length: 7 }, (_value, key) => `${key + 1} RP`),
  },
  {
    key: 'set',
    title: 'Set',
    items: Object.values(CardSet).filter((value) => (
      value !== CardSet.TheTruthIsOutThere
      && value !== CardSet.GenCon
    )),
  },
  {
    key: 'keywords',
    title: 'Keywords',
    items: [
      'Agent',
      'Believer',
      'Cute',
      'FBI',
      'Independent',
      'Information',
      'Killer',
      'Law',
      'Neutral',
      'Skeptic',
    ],
    multiple: true,
  },
];

const {
  dataTable,
  searchPredicate,
  filtersPredicate,
  getRouteQuery,
} = useDataTable<Agent>('agents', {
  filters,
  perPage: 30,
});

const itemsPerPageOptions = [
  { value: 30, title: '30' },
  { value: 60, title: '60' },
  { value: 120, title: '120' },
];

const agents = computed<Agent[]>(() => (
  pool
    .filter((card) => (
      card.type === CardType.Agent
      && card.set !== CardSet.TheTruthIsOutThere
      && card.set !== CardSet.GenCon
    ))
    .filter((cardA, index, self) => (
      self.findIndex((cardB) => cardB.title === cardA.title) === index
    ))
    .map((card) => ({
      ...card,
      costInt: card.cost ? parseInt(card.cost, 10) : 0,
    }))
));

const getSelectedCard = (): Card | undefined => {
  if (!route.query.id) {
    return undefined;
  }

  return agents.value.find((card) => card.id === route.query.id);
};

const inTeam = ref<boolean>(false);
const viewTeam = ref<boolean>(false);
const selectedCard = ref<Card | undefined>(getSelectedCard());

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
  if (selectedCard.value) {
    return {
      id: selectedCard.value.id,
    };
  }

  return getRouteQuery();
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
}, {
  immediate: true,
});

const cards = computed<Agent[]>(() => (
  agents.value.filter((card) => {
    const hit = searchPredicate(card, [
      'id',
      'title',
      'gameEffect',
    ]);

    if (!hit) {
      return false;
    }

    if (inTeam.value && !teambuilder.hasAgent(card.id)) {
      return false;
    }

    return filtersPredicate(card);
  })
));

const remainingCost = computed(() => 20 - teambuilder.cost.value);

watch(remainingCost, (value) => {
  if (value < 20) {
    return;
  }

  inTeam.value = false;
});

const clearSelection = () => {
  if (!confirm('Are you sure you want to clear the selection?\nThis action cannot be undone.')) {
    return;
  }

  teambuilder.clear();
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

  dataTable.value.page = Math.floor(value / dataTable.value.perPage) + 1;
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
</script>

<template>
  <layout-content fluid>
    <card-toolbar v-model:search="dataTable.search">
      <filter-dialog
        v-model="dataTable.filters"
        :filters="filters"
        :items="cards"
      />
      <v-badge
        :model-value="teambuilder.cost.value > 0"
        :content="teambuilder.cost.value"
        color="primary"
      >
        <v-menu>
          <template #activator="{ props:menuProps }">
            <v-btn
              v-tooltip:top="'Actions'"
              :disabled="teambuilder.cost.value === 0"
              rounded
              icon="mdi-dots-vertical"
              v-bind="menuProps"
            />
          </template>
          <v-list>
            <v-list-item
              title="In Team"
              @click="inTeam = !inTeam"
            >
              <template #prepend>
                <v-switch
                  :model-value="inTeam"
                  hide-details
                  class="mr-2"
                />
              </template>
            </v-list-item>
            <v-list-item
              title="View Team"
              @click="viewTeam = true"
            />
            <v-divider />
            <v-list-item
              :disabled="teambuilder.cost.value === 0"
              title="Clear Selection"
              base-color="error"
              @click="clearSelection"
            />
          </v-list>
        </v-menu>
      </v-badge>
    </card-toolbar>
    <v-data-iterator
      v-model:page="dataTable.page"
      v-model:items-per-page="dataTable.perPage"
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
              :disabled="item.raw.costInt > remainingCost && !teambuilder.hasAgent(item.raw.id)"
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
              <v-card-actions>
                <v-spacer />
                # In team
                <v-number-input
                  :model-value="teambuilder.hasAgent(item.raw.id) ? 1 : 0"
                  :min="0"
                  :max="1"
                  :bg-color="teambuilder.hasAgent(item.raw.id) ? 'primary' : undefined"
                  flat
                  hide-details
                  max-width="80"
                  variant="solo-filled"
                  density="compact"
                  control-variant="stacked"
                  @click.stop
                  @update:model-value="$event > 0 ? teambuilder.setAgent(item.raw) : teambuilder.removeAgent(item.raw.id)"
                />
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
    <card-dialog v-model="selectedCard" />
    <team-dialog v-model="viewTeam" />
  </layout-content>
</template>
