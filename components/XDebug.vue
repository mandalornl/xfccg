<script setup>
/* eslint-disable vue/require-prop-types */
const props = defineProps([
  'value'
]);

const getCircularReplacer = () => {
  const seen = new WeakSet();

  return (_, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }

      seen.add(value);
    }

    return value;
  };
};

const debug = computed(() => {
  try {
    return JSON.parse(JSON.stringify(toValue(props.value), getCircularReplacer()));
  } catch (error) {
    return error.message;
  }
});
</script>

<template>
  <code class="d-block text-pre-wrap">{{ debug }}</code>
</template>