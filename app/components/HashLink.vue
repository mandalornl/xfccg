<script setup lang="ts">
const props = defineProps<{
  value: string | number,
}>();

const onClick = () => navigateTo({
  hash: `#${props.value}`,
}, {
  replace: true,
});
</script>

<template>
  <a
    :href="`#${value}`"
    @click.prevent="onClick"
  >
    <slot>{{ value }}</slot>
  </a>
</template>