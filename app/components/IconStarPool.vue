<script setup lang="ts">
withDefaults(defineProps<{
  small?: boolean,
}>(), {
  small: false,
});
</script>

<template>
  <v-avatar
    :size="small ? 16 : 20"
    rounded
    color="indigo-lighten-2"
    title="Resource or Conspiracy Pool"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-virus-outline"
    />
  </v-avatar>
</template>
