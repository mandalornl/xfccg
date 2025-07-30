<script setup lang="ts">
const props = defineProps<{
  value: unknown,
}>();

const getCircularReplacer = () => {
  const seen = new WeakSet();

  return (key: string, value: unknown) => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }
});
</script>

<template>
  <code class="d-block text-pre-wrap">{{ debug }}</code>
</template>