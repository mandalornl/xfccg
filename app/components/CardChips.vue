<script setup lang="ts">
defineProps<{
  title?: string,
  value?: string[],
}>();
</script>

<template>
  <div class="d-flex flex-wrap ma-n1">
    <v-chip
      v-for="text of value"
      :key="text"
      :text="text"
      label
      color="primary"
      class="ma-1"
    />
  </div>
</template>