<script lang="ts" setup>
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <v-app>
    <v-app-bar flat>
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="d-inline-block text-decoration-none"
        >
          <app-logo />
        </nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <app-navigation />
    <v-main style="--v-layout-top: 64px">
      <slot />
    </v-main>
    <v-footer app>
      &copy; {{ year }}
    </v-footer>
  </v-app>
</template>