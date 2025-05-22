<script lang="ts" setup>
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <v-app>
    <v-app-bar
      flat
      title="The X-Files CCG"
    />
    <v-main style="--v-layout-top: 64px">
      <slot />
    </v-main>
    <v-footer app>
      &copy; {{ year }}
    </v-footer>
  </v-app>
</template>