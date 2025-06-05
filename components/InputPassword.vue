<script lang="ts" setup>
import type { RuleString } from '~/types/rule';

const props = withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: RuleString[],
  strictRules?: boolean,
  autocomplete?: string,
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
  autocomplete: 'off',
});

const model = defineModel<string>();
const showPassword = ref<boolean>(false);

const minimalRules: RuleString[] = [
  (v) => v.length >= 12 || 'Minimal length 12 characters',
  (v) => /[0-9]/.test(v) || 'Use a digit',
  (v) => /[a-z]/.test(v) || 'Use a lowercase character',
  (v) => /[A-Z]/.test(v) || 'Use an uppercase character',
];

const allRules = computed<Array<RuleString>>(() => ([
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