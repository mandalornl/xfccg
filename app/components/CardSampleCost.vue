<script setup lang="ts">
import {
  type CardCostPool,
  type Card,
  CardSet,
} from '~/types/card';
import { sample } from '~/utils/sample';

const { cost } = defineProps<{
  cost: CardCostPool;
}>();

const pool = await usePool(CardSet.Premiere);

const card = useState<Card>(`card-sample:cost:${cost}`, () => sample(pool.filter((card) => card.cost?.endsWith(cost)))!);
</script>

<template>
  <card-image :card="card" />
</template>
