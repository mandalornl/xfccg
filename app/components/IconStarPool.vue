<script setup lang="ts">
withDefaults(defineProps<{
  small?: boolean,
}>(), {
  small: false,
});
</script>

<template>
  <v-avatar
    v-tooltip:top="'Resource or Conspiracy Pool'"
    :size="small ? 16 : 20"
    rounded
    color="indigo-lighten-2"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-virus-outline"
    />
  </v-avatar>
</template>
