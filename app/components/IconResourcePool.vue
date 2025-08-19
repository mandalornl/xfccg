<script setup lang="ts">
withDefaults(defineProps<{
  small?: boolean,
}>(), {
  small: false,
});
</script>

<template>
  <v-avatar
    v-tooltip:top="'Resource Pool'"
    :size="small ? 16 : 20"
    rounded
    color="blue"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-police-badge"
    />
  </v-avatar>
</template>
