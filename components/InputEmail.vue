<script lang="ts" setup>
type Rule = (value: string) => boolean | string;

withDefaults(defineProps<{
  label?: string,
  disabled?: boolean,
  rules?: Rule[],
  autocomplete?: string,
}>(), {
  label: undefined,
  disabled: false,
  rules: () => ([]),
  autocomplete: 'email',
});

const model = defineModel<string>({
  set: (value: string) => {
    if (!value) {
      return '';
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