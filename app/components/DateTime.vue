<script setup lang="ts">
import { useDate } from 'vuetify';

const dateAdapter = useDate();

const {
  date,
  format = 'fullDateTime24h',
} = defineProps<{
  date: number | string,
  format?: string,
}>();

const text = computed<string>(() => dateAdapter.format(new Date(date), format));
</script>

<template>
  <span>{{ text }}</span>
</template>
