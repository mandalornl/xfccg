<script setup lang="ts">
import { getColorByCost } from '~/utils/color';

defineProps<{
  small?: boolean,
}>();

const color = getColorByCost('conspiracy');
</script>

<template>
  <v-avatar
    v-tooltip:top="'Conspiracy Pool'"
    :size="small ? 16 : 20"
    :color="color"
    rounded
    tag="span"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-hand-back-left"
    />
  </v-avatar>
</template>

<style lang="scss" scoped>
.v-icon {
  transform: rotateZ(-25deg);
}
</style>
