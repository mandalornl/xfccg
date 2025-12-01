<script setup lang="ts">
const props = defineProps<{
  value: string | number,
}>();

const openLink = () => navigateTo({
  hash: `#${props.value}`,
}, {
  replace: true,
});
</script>

<template>
  <a
    :href="`#${value}`"
    @click.prevent="openLink"
  >
    <slot>{{ value }}</slot>
  </a>
</template>
