<script setup lang="ts">
import { useTheme } from 'vuetify';

const route = useRoute();
const theme = useTheme();

useHead({
  titleTemplate: (title?: string) => {
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
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
html {
  font-family: Roboto, sans-serif;
}

@layer vuetify-core.reset {
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 8px;
  }

  p {
    margin: 0 0 16px;
  }

  ul, ol {
    margin: 0 0 16px;

    padding-left: 24px;

    ul, ol {
      margin-bottom: 0;
    }
  }

  a {
    transition: color .2s ease-out;

    color: rgb(var(--v-theme-primary));
  }
}

.position-sticky {
  top: 64px;

  z-index: 1;
}
</style>
