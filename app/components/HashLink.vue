<script setup lang="ts">
const { value } = defineProps<{
  value: string | number,
}>();

const openLink = () => navigateTo({
  hash: `#${value}`,
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
