<script setup lang="ts">
import {
  type Card,
  CardSet,
} from '~/types/card';

const props = defineProps<{
  id: string;
}>();

const pool = await usePool([
  CardSet.Premiere,
]);

const card = useState<Card>(`card-sample:id:${props.id}`, () => pool.find((card) => card.id === props.id)!);
</script>

<template>
  <card-image :card="card" />
</template>
