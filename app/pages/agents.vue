<script setup lang="ts">
import {
  type Card,
  CardSet,
  CardType,
} from '~/types/card';
import type { Agent } from '~/types/agent';
import { FilterOperation } from '~/types/filter';
import { InvestigationSkill } from '~/types/skill';

const route = useRoute();
const router = useRouter();
const {
  teamState,
  totalCost,
  clearTeam,
} = useTeamState();
const pool = await usePool();

useScrollPosition();

useHead({
  title: 'Agents',
});

const filters = useFilters<Agent>({
  skills: {
    title: 'Skills',
    items: Object.values(InvestigationSkill),
  },
  cost: {
    title: 'Cost',
    items: Array.from({ length: 7 }, (value, key) => `${key + 1} RP`),
  },
  set: {
    title: 'Set',
    items: Object.values(CardSet).filter((value) => (
      value !== CardSet.TheTruthIsOutThere
      && value !== CardSet.GenCon
    )),
  },
  keywords: {
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
  },
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

const getRouteQueryValue = (key: string, defaultValue: string = ''): string => (
  (route.query[key] as string) || defaultValue
);

const getSelectedCard = (): Card | undefined => {
  if (!route.query.id) {
    return undefined;
  }

  return agents.value.find((card) => card.id === route.query.id);
};

const search = ref<string>(getRouteQueryValue('search'));
const page = ref<number>(Number(getRouteQueryValue('page', '1')));
const perPage = ref<number>(Number(getRouteQueryValue('perPage', '30')));
const inTeam = ref<boolean>(false);
const selectedCard = ref<Card | undefined>(getSelectedCard());

const routeQuery = computed<Record<string, string | number | null | undefined>>(() => {
  if (selectedCard.value) {
    return {
      id: selectedCard.value.id,
    };
  }

  return {
    search: search.value || undefined,
    page: page.value > 1 ? page.value : undefined,
    perPage: perPage.value !== 30 ? perPage.value : undefined,
    ...Object.fromEntries(
      filters.value.map((filter) => ([
        filter.key,
        filter.value.length > 0
          ? filter.value.join(filter.operation === FilterOperation.And ? '+' : ',')
          : undefined,
      ]))
    ),
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

watch([
  search,
  filters,
], () => {
  page.value = 1;
}, {
  deep: true,
});

const cards = computed<Agent[]>(() => (
  agents.value.filter((card) => {
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

    if (inTeam.value && !teamState.value[card.id]) {
      return false;
    }

    return useHasFilters<Agent>(filters, card);
  })
));

const remainingCost = computed(() => 20 - totalCost.value);

watch(remainingCost, (value) => {
  if (value < 20) {
    return;
  }

  inTeam.value = false;
});
</script>

<template>
  <layout-content fluid>
    <card-toolbar v-model:search="search">
      <filter-dialog
        v-model="filters"
        :items="cards"
      />
      <team-dialog />
      <v-badge
        :model-value="totalCost > 0"
        :content="totalCost"
        color="primary"
      >
        <v-menu>
          <template #activator="{ props:menuProps }">
            <v-btn
              v-tooltip:top="'Actions'"
              :disabled="totalCost === 0"
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
            <v-divider />
            <v-list-item
              :disabled="totalCost === 0"
              title="Clear Team"
              base-color="error"
              @click="clearTeam"
            />
          </v-list>
        </v-menu>
      </v-badge>
    </card-toolbar>
    <v-data-iterator
      v-model:page="page"
      v-model:items-per-page="perPage"
      :items="cards"
      class="bg-grey-darken-4"
    >
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item of items"
            :key="item.raw.id"
            cols="12"
            sm="4"
            md="3"
            lg="2"
          >
            <v-card
              :disabled="item.raw.costInt > remainingCost && !teamState[item.raw.id]"
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
                  :model-value="teamState[item.raw.id] ? 1 : 0"
                  :min="0"
                  :max="1"
                  :bg-color="teamState[item.raw.id] ? 'primary' : undefined"
                  flat
                  hide-details
                  max-width="80"
                  variant="solo-filled"
                  density="compact"
                  control-variant="stacked"
                  @click.stop
                  @update:model-value="teamState[item.raw.id] = $event > 0 ? item.raw : null"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template #footer="footerProps">
        <v-data-table-footer
          v-bind="footerProps"
          :items-per-page-options="itemsPerPageOptions"
        />
      </template>
    </v-data-iterator>
    <card-dialog v-model="selectedCard" />
  </layout-content>
</template>
