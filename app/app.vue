<script setup lang="ts">
const route = useRoute();

onMounted(() => {
  if (!route.hash) {
    return;
  }

  const id = route.hash.replace('#', '');
  const input = document.getElementById(id) as HTMLElement;

  if (!input) {
    return;
  }

  window.scrollTo(input.offsetLeft, input.offsetTop);
});
</script>

<template>
  <nuxt-layout>
    <v-app>
      <nuxt-page />
    </v-app>
  </nuxt-layout>
</template>
