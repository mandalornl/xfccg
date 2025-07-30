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
    color="blue"
    title="Resource Pool"
  >
    <v-icon
      :size="small ? 12 : 16"
      icon="mdi-police-badge"
    />
  </v-avatar>
</template>
