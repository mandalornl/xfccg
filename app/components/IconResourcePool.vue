<script setup lang="ts">
import { getColorByCost } from '~/utils/color';

withDefaults(defineProps<{
  small?: boolean,
}>(), {
  small: false,
});

const color = getColorByCost('resource');
</script>

<template>
  <v-avatar
    v-tooltip:top="'Resource Pool'"
    :size="small ? 16 : 20"
    :color="color"
    rounded
    tag="span"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-police-badge"
    />
  </v-avatar>
</template>
