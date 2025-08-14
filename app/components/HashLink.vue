<script setup lang="ts">
defineProps<{
  value: string | number,
}>();
</script>

<template>
  <!-- TODO: Fix "Cannot resolve file" -->
  <nuxt-link :to="`#${value}`">
    <slot>{{ value }}</slot>
  </nuxt-link>
</template>