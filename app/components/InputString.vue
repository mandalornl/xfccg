<script setup lang="ts">
import type { RuleString } from '~/types/rule';

withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: RuleString[],
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
});

const model = defineModel<string | null>({
  set: (value: string | null): string | null => value || null
});
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