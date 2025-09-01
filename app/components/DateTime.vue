<script setup lang="ts">
import { useDate } from 'vuetify';

const date = useDate();

const props = withDefaults(defineProps<{
  value: number | string,
  format?: string,
}>(), {
  format: 'fullDateTime24h',
});

const formatted = computed<string>(() => date.format(new Date(props.value), props.format));
</script>

<template>
  <span>{{ formatted }}</span>
</template>