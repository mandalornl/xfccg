<script setup lang="ts">
import {
  type Card,
  CardSet,
} from '~/types/card';
import { sample } from '~/utils/sample';

const pool = await usePool([
  CardSet.Premiere,
]);

const card = useState<Card>('card-sample', () => sample(pool)!);
</script>

<template>
  <card-image :card="card" />
</template>
