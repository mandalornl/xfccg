<script setup lang="ts">
defineProps<{
  color?: string;
}>();

const counter = defineModel<number>({
  default: 0,
});
</script>

<template>
  <v-card
    :color="color"
    tile
    height="100%"
    class="d-flex align-center"
  >
    <v-card-text class="d-flex align-center justify-space-between">
      <v-btn
        :disabled="counter === 0"
        variant="text"
        icon="mdi-chevron-left"
        size="x-large"
        color="white"
        @click="counter -= 1"
      />
      <div class="mx-4 text-h1 text-white font-weight-bold">
        {{ counter }}
      </div>
      <v-btn
        :disabled="counter === 99"
        variant="text"
        icon="mdi-chevron-right"
        size="x-large"
        color="white"
        @click="counter += 1"
      />
    </v-card-text>
  </v-card>
</template>
