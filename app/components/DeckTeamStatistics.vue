<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { CardType } from '~/types/card';
import {
  BasicSkill,
  InvestigationSkill,
} from '~/types/skill';
import type { AgentStat } from '~/types/agent';
import { getIconBySkill } from '~/utils/icon';
import { getColorBySkillTotal } from '~/utils/color';

const props = defineProps<{
  cards: CardInDeck[];
}>();

const stats = computed<AgentStat[]>(() => {
  const team = props.cards.filter((card) => card.type === CardType.Agent);

  return [
    ...Object.values(InvestigationSkill),
    ...Object.values(BasicSkill),
  ].map((title) => {
    let total = 0;

    for (const agent of team) {
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
  });
});
</script>

<template>
  <div class="d-flex flex-wrap ga-2">
    <v-chip
      v-for="stat of stats"
      :key="stat.title"
      :text="`${stat.title} (${stat.total})`"
      :prepend-icon="stat.icon"
      :color="stat.color"
    />
  </div>
</template>