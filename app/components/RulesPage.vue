<script setup lang="ts">
defineProps<{
  page: string,
}>();
</script>

<template>
  <section
    :id="page"
    class="mb-4"
  >
    <slot />
    <p class="text-center">
      {{ page }}
    </p>
  </section>
</template>