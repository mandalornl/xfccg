<script setup lang="ts">
import type { RuleString } from '~/types/rule';

withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: RuleString[],
  autocomplete?: string,
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
  autocomplete: 'email',
});

const model = defineModel<string | null>({
  set: (value: string | null): string | null => {
    if (!value) {
      return null;
    }

    return value
      .trim()
      .toLowerCase();
  }
});
</script>

<template>
  <v-text-field
    v-model.trim="model"
    :label="label"
    :disabled="disabled"
    :rules="!disabled ? rules : []"
    :required="rules.length > 0"
    :autocomplete="autocomplete"
    type="email"
  />
</template>