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
import { getIconBySkill } from '~/utils/icon';
import { getColorBySkillTotal } from '~/utils/color';

const { xs } = useDisplay();
const teambuilder = useTeambuilder();

const isOpen = defineModel<boolean>({
  default: false,
});

const team = computed<Agent[]>(() => Object.values(teambuilder.clone()).filter((agent) => agent !== null));

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
    icon: getIconBySkill(title),
    color: getColorBySkillTotal(total),
  };
})));
</script>

<template>
  <v-dialog
    v-model="isOpen"
    :fullscreen="xs"
    scrollable
    width="500"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        Team
        <v-btn
          v-tooltip:top="'Close'"
          variant="text"
          icon="mdi-close"
          size="small"
          @click="isOpen = false"
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
              <td class="w-0 text-no-wrap">
                <v-icon
                  :icon="stat.icon"
                  :color="stat.color"
                />
              </td>
              <td>{{ stat.title }}</td>
              <td>{{ stat.total }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="text"
          color="primary"
          text="Close"
          @click="isOpen = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
