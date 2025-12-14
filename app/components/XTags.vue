<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<template>
  <div class="d-flex flex-wrap ga-2">
    <v-chip
      v-for="text of items"
      :key="text"
      :text="text"
      label
    />
  </div>
</template>
