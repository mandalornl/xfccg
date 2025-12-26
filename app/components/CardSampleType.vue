<script setup lang="ts">
import {
  type CardType,
  type Card,
  CardSet,
} from '~/types/card';
import { sample } from '~/utils/sample';

const props = defineProps<{
  type: CardType;
}>();

const pool = await usePool([
  CardSet.Premiere,
]);

const card = useState<Card>(`card-sample:type:${props.type}`, () => sample(pool.filter((card) => card.type === props.type))!);
</script>

<template>
  <card-image :card="card" />
</template>
