<script setup lang="ts">
import { useDate } from 'vuetify';

const dateAdapter = useDate();

const props = withDefaults(defineProps<{
  date: number | string,
  format?: string,
}>(), {
  format: 'fullDateTime24h',
});

const formatted = computed<string>(() => dateAdapter.format(new Date(props.date), props.format));
</script>

<template>
  <span>{{ formatted }}</span>
</template>