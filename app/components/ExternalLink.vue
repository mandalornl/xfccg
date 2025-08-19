<script setup lang="ts">
defineProps<{
  href: string,
  text: string,
}>();
</script>

<template>
  <a
    v-tooltip:top="'Opens in a new window'"
    :href="href"
    target="_blank"
    class="d-inline-flex align-baseline"
  >
    <slot>{{ text }}</slot>&nbsp;
    <v-icon
      icon="mdi-open-in-new"
      size="x-small"
    />
  </a>
</template>