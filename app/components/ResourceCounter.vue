<script setup lang="ts">
withDefaults(defineProps<{
  color?: string,
  rotate?: boolean,
}>(), {
  color: undefined,
  rotate: false,
});

const counter = defineModel<number>({
  default: 0,
});
</script>

<template>
  <v-card
    :color="color"
    :tile="rotate"
    height="100%"
    class="d-flex align-center"
  >
    <v-card-text :class="[ 'd-flex align-center justify-space-between', { 'flex-column fill-height': !rotate } ]">
      <v-btn
        :disabled="counter === 99"
        :icon="rotate ? 'mdi-chevron-left' : 'mdi-chevron-up'"
        color="white"
        variant="text"
        size="x-large"
        @click="counter += 1"
      />
      <div :class="[ 'mx-4 text-h1 text-white font-weight-bold', { 'rotate-n90': rotate } ]">
        {{ counter }}
      </div>
      <v-btn
        :disabled="counter === 0"
        :icon="rotate ? 'mdi-chevron-right' : 'mdi-chevron-down'"
        color="white"
        variant="text"
        size="x-large"
        @click="counter -= 1"
      />
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.rotate-n90 {
  transform: rotate(-90deg);
}
</style>