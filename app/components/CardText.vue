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
    <game-effect
      :text="text"
      class="text-medium-emphasis"
    />
  </div>
</template>