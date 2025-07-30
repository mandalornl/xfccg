<script setup lang="ts">
defineProps<{
  href: string,
  text: string,
}>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    title="Opens in a new window"
    class="d-inline-flex align-baseline"
  >
    <slot>{{ text }}</slot>&nbsp;
    <v-icon
      icon="mdi-open-in-new"
      size="x-small"
    />
  </a>
</template>