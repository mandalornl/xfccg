<script setup lang="ts">
import {
  type Card,
  CardSet,
} from '~/types/card';

const { id } = defineProps<{
  id: string;
}>();

const pool = await usePool(CardSet.Premiere);

const card = useState<Card>(`card-sample:id:${id}`, () => pool.find((card) => card.id === id)!);
</script>

<template>
  <card-image :card="card" />
</template>
