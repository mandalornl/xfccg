<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { InvestigationSkill as InvestigationSkillEnum } from '~/types/skill';

defineProps<{
  cards: CardInDeck[];
}>();
</script>

<template>
  <deck-site
    :cards="cards"
    :keywords="[
      InvestigationSkillEnum.AlienInvestigation,
      InvestigationSkillEnum.Behavioral,
      InvestigationSkillEnum.Bureaucracy,
      InvestigationSkillEnum.Computer,
      InvestigationSkillEnum.CriminalInvestigation,
      InvestigationSkillEnum.EvidenceCollection,
      InvestigationSkillEnum.Medical,
      InvestigationSkillEnum.Observation,
      InvestigationSkillEnum.OccultInvestigation,
      InvestigationSkillEnum.Sciences,
      InvestigationSkillEnum.Subterfuge,
    ]"
    title="Prerequisite"
  />
</template>