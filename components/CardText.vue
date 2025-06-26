<script lang="ts" setup>
defineProps<{
  title?: string,
  text?: string,
}>();
</script>

<template>
  <div class="card-text">
    <div
      v-if="title"
      class="font-weight-medium"
    >
      {{ title }}
    </div>
    <div class="text-medium-emphasis text-pre-wrap">
      {{ text }}
    </div>
  </div>
</template>