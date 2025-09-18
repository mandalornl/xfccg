<script setup lang="ts">
import type { CardInDeck } from '~/types/deck';
import { InvestigationSkill } from '~/types/skill';

defineProps<{
  cards: CardInDeck[];
}>();
</script>

<template>
  <deck-site
    :cards="cards"
    :keywords="[
      InvestigationSkill.AlienInvestigation,
      InvestigationSkill.Behavioral,
      InvestigationSkill.Bureaucracy,
      InvestigationSkill.Computer,
      InvestigationSkill.CriminalInvestigation,
      InvestigationSkill.EvidenceCollection,
      InvestigationSkill.Medical,
      InvestigationSkill.Observation,
      InvestigationSkill.OccultInvestigation,
      InvestigationSkill.Sciences,
      InvestigationSkill.Subterfuge,
    ]"
    title="Prerequisite"
  />
</template>