<script setup lang="ts">
defineProps<{
  value: string | number,
}>();
</script>

<template>
  <nuxt-link :to="`#${value}`">
    <slot>{{ value }}</slot>
  </nuxt-link>
</template>