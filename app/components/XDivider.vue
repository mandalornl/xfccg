<script setup lang="ts">
defineProps<{
  text?: string;
}>();
</script>

<template>
  <div class="d-flex align-center ga-3">
    <v-divider />
    <div class="text-no-wrap">
      <slot>
        {{ text }}
      </slot>
    </div>
    <v-divider />
  </div>
</template>