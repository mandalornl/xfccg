<script lang="ts" setup>
const model = defineModel<string | null>();
</script>

<template>
  <v-btn-toggle
    v-model="model"
    mandatory
    density="compact"
    color="primary"
  >
    <v-btn
      value="and"
      size="small"
      text="And"
    />
    <v-btn
      value="or"
      size="small"
      text="Or"
    />
  </v-btn-toggle>
</template>