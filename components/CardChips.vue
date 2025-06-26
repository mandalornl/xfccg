<script lang="ts" setup>
defineProps<{
  title?: string,
  value?: string[],
  queryKey?: string,
}>();
</script>

<template>
  <div class="card-chips">
    <div
      v-if="title"
      class="font-weight-medium mb-1"
    >
      {{ title }}
    </div>
    <div class="overflow-hidden">
      <div class="d-flex flex-wrap ma-n1">
        <v-chip
          v-for="text of value"
          :key="text"
          :to="queryKey ? {
            name: 'cards',
            query: {
              [queryKey]: text,
            },
          } : undefined"
          :text="text"
          class="ma-1"
        />
      </div>
    </div>
  </div>
</template>