<script setup lang="ts">
import { useDisplay } from 'vuetify';

import {
  BasicSkill,
  InvestigationSkill,
} from '~/types/skill';
import type {
  Agent,
  AgentStat,
} from '~/types/agent';

const inTeamState = useInTeamState();
const { xs } = useDisplay();

const dialog = ref<boolean>(false);

const getIcon = (value: string): string | undefined => ({
  [InvestigationSkill.AlienInvestigation]: 'mdi-alien-outline',
  [InvestigationSkill.Behavioral]: 'mdi-head-cog-outline',
  [InvestigationSkill.Bureaucracy]: 'mdi-bank',
  [InvestigationSkill.Computer]: 'mdi-desktop-classic',
  [InvestigationSkill.CriminalInvestigation]: 'mdi-account-search',
  [InvestigationSkill.EvidenceCollection]: 'mdi-archive-search-outline',
  [InvestigationSkill.Medical]: 'mdi-hospital-box-outline',
  [InvestigationSkill.Observation]: 'mdi-cctv',
  [InvestigationSkill.OccultInvestigation]: 'mdi-pentagram',
  [InvestigationSkill.Sciences]: 'mdi-flask-outline',
  [InvestigationSkill.Subterfuge]: 'mdi-incognito',
  [BasicSkill.LongRangeCombat]: 'mdi-pistol',
  [BasicSkill.CloseRangeCombat]: 'mdi-knife-military',
  [BasicSkill.Health]: 'mdi-heart-pulse',
  [BasicSkill.Resources]: 'mdi-piggy-bank',
}[value]);

const getColor = (value: number): string => {
  if (value >= 7) {
    return 'light-blue-accent-2';
  } else if (value >= 4) {
    return 'green-accent-2';
  } else if (value === 3) {
    return 'orange-accent-2';
  } else if (value === 2) {
    return 'red-accent-2';
  } else if (value === 1) {
    return 'grey-lighten-1';
  } else {
    return 'grey-darken-2';
  }
};

const team = computed<Agent[]>(() => Object.values(inTeamState.value).filter((agent) => agent !== null));

const stats = computed<AgentStat[]>(() => ([
  ...Object.values(InvestigationSkill),
  ...Object.values(BasicSkill),
].map((title) => {
  let total = 0;

  for (const agent of team.value) {
    if (typeof agent.skills?.[title] !== 'number') {
      continue;
    }

    total += agent.skills[title];
  }

  return {
    total,
    title,
    icon: getIcon(title),
    color: getColor(total),
  };
})));
</script>

<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
    scrollable
    width="500"
  >
    <template #activator="{ props:dialogProps }">
      <v-btn
        :disabled="team.length === 0"
        rounded
        title="Team statistics"
        icon="mdi-chart-line"
        v-bind="dialogProps"
      />
    </template>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        Statistics
        <v-btn
          variant="text"
          icon="mdi-close"
          size="small"
          title="Close"
          @click="dialog = false"
        />
      </v-card-title>
      <v-card-text class="text-body-1">
        <v-table
          hover
          density="compact"
        >
          <tbody>
            <tr
              v-for="stat of stats"
              :key="stat.title"
              :class="`text-${stat.color}`"
            >
              <td>{{ stat.title }}</td>
              <td>{{ stat.total }}</td>
            </tr>
          </tbody>
        </v-table>
        <!--<v-btn-group variant="tonal">
          <v-tooltip
            v-for="stat of stats"
            :key="stat.title"
            location="top"
          >
            <template #activator="{ props:tooltipProps }">
              <v-btn
                :icon="stat.icon"
                :color="stat.color"
                v-bind="tooltipProps"
              />
            </template>
            {{ stat.title }} ({{ stat.total }})
          </v-tooltip>
        </v-btn-group>-->
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="text"
          color="primary"
          text="Close"
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>