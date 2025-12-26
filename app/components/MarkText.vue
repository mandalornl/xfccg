<script setup lang="ts">
import { escapeRegex } from '~/utils/regex';

const props = defineProps<{
  highlight: string;
  text: string;
}>();

const highlightedText = computed<string>(() => {
  if (!props.text) {
    return '';
  }

  if (!props.highlight) {
    return props.text;
  }

  const regX = new RegExp(`(${escapeRegex(props.highlight)})`, 'gi');

  return props.text.replace(regX, '<mark>$1</mark>');
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
