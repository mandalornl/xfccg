<script setup lang="ts">
const model = defineModel<string[]>({
  default: () => ([]),
});

const tags = [
  'Alien',
  'Alien Investigation',
  'Behavioral',
  'Believer',
  'Bureaucracy',
  'Computer',
  'Criminal Investigation',
  'Evidence Collection',
  'Evolutionary',
  'Government',
  'Medical',
  'Move',
  'Neutral',
  'Observation',
  'Occult',
  'Occult Investigation',
  'Phenomena',
  'Primordial',
  'Sciences',
  'Skeptic',
  'Subterfuge',
];
</script>

<template>
  <v-select
    v-model="model"
    :items="tags"
    multiple
    chips
    closable-chips
    clearable
    label="Tags"
  />
</template>
