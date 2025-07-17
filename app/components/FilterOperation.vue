<script lang="ts" setup>
import { FilterOperation as FilterOperationEnum } from '~/utils/filter-operation';

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
      :value="FilterOperationEnum.AND"
      size="small"
      text="And"
    />
    <v-btn
      :value="FilterOperationEnum.OR"
      size="small"
      text="Or"
    />
  </v-btn-toggle>
</template>