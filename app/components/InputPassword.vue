<script setup lang="ts">
import type { ValidationRule } from 'vuetify/framework';

const props = withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: ValidationRule[],
  strictRules?: boolean,
  autocomplete?: string,
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
  autocomplete: 'off',
});

const model = defineModel<string | null>({
  set: (value: string | null): string | null => value || null
});
const showPassword = ref<boolean>(false);

const minimalRules: ValidationRule[] = [
  (v: string) => v.length >= 12 || 'Minimal length 12 characters',
  (v: string) => /[0-9]/.test(v) || 'Use a digit',
  (v: string) => /[a-z]/.test(v) || 'Use a lowercase character',
  (v: string) => /[A-Z]/.test(v) || 'Use an uppercase character',
];

const allRules = computed<ValidationRule[]>(() => ([
  ...props.rules,
  ...(props.strictRules ? minimalRules : []),
]));
</script>

<template>
  <v-text-field
    v-model.trim="model"
    :label="label"
    :disabled="disabled"
    :rules="!disabled ? allRules : []"
    :required="allRules.length > 0"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :autocomplete="autocomplete"
    @click:append-inner="showPassword = !showPassword"
  />
</template>
