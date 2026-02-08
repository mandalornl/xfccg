<script setup lang="ts">
import { StarterKit } from '@tiptap/starter-kit';
import {
  Markdown,
  MarkdownManager,
} from '@tiptap/markdown';
import { generateHTML } from '@tiptap/html';

const props = defineProps<{
  text?: string;
}>();

const markdownManager = new MarkdownManager({
  extensions: [
    StarterKit,
    Markdown,
  ],
});

const innerHTML = computed<string>(() => {
  const json = markdownManager.parse(props.text || '');

  return generateHTML(json, [
    StarterKit,
  ]);
});

const render = () => (
  h('div', {
    innerHTML: innerHTML.value,
  })
);
</script>

<template>
  <render />
</template>
