<script lang="ts" setup>
type Rule = (value: string) => boolean | string;

withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: Rule[],
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
});

const model = defineModel<string>();
</script>

<template>
  <v-text-field
    v-model.trim="model"
    :label="label"
    :disabled="disabled"
    :rules="!disabled ? rules : []"
    :required="rules.length > 0"
  />
</template>