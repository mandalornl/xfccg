<script setup lang="ts">
import { useTheme } from 'vuetify';

const route = useRoute();
const theme = useTheme();

useHead({
  titleTemplate: (title) => {
    const siteName = 'The X-Files CCG';

    return title ? `${title} | ${siteName}` : siteName;
  }
});

watch(theme.name, (value) => {
  localStorage.setItem('xfccg-theme', value);
});

onBeforeMount(() => {
  const storedTheme = localStorage.getItem('xfccg-theme');

  if (!storedTheme) {
    return;
  }

  theme.change(storedTheme);
});

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

<style lang="scss">
p {
  margin-bottom: 1rem;
}

ul, ol {
  &:not(.v-pagination__list) {
    padding-left: 1.5rem;

    margin-bottom: 1rem;
  }

  ul, ol {
    margin-bottom: 0 !important;
  }
}

a {
  transition: color .2s ease-out;

  color: rgb(var(--v-theme-primary));
}

.position-sticky {
  top: 64px;

  z-index: 1;
}
</style>
