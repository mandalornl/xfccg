<script setup lang="ts">
import { getColorByCost } from '~/utils/color';

withDefaults(defineProps<{
  small?: boolean,
}>(), {
  small: false,
});

const color = getColorByCost('star');
</script>

<template>
  <v-avatar
    v-tooltip:top="'Resource or Conspiracy Pool'"
    :size="small ? 16 : 20"
    :color="color"
    rounded
    tag="span"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-virus-outline"
    />
  </v-avatar>
</template>
