<script setup lang="ts">
defineProps<{
  title?: string,
}>();
</script>

<template>
  <div class="card-item">
    <div
      v-if="title"
      class="font-weight-medium"
    >
      {{ title }}
    </div>
    <div class="text-medium-emphasis">
      <slot />
    </div>
  </div>
</template>