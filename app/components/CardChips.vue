<script lang="ts" setup>
defineProps<{
  title?: string,
  value?: string[],
}>();

const emit = defineEmits([
  'click',
]);
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
      @click="emit('click', text)"
    />
  </div>
</template>