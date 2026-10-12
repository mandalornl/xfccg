<script setup lang="ts">
import { escapeRegex } from '~/utils/regex';

const {
  text,
  highlight,
} = defineProps<{
  text: string;
  highlight: string;
}>();

const highlightedText = computed<string>(() => {
  if (!text) {
    return '';
  }

  if (!highlight) {
    return text;
  }

  const regX = new RegExp(`(${escapeRegex(highlight)})`, 'gi');

  return text.replace(regX, '<mark>$1</mark>');
});

const render = () => (
  h('div', {
    class: 'mark-text',
    innerHTML: highlightedText.value,
  })
);
</script>

<template>
  <render />
</template>
