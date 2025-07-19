<script lang="ts" setup>
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
    color="red"
    title="Conspiracy Pool"
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
