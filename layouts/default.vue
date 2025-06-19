<script lang="ts" setup>
const user = useSupabaseUser();

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <v-app>
    <admiral-snackbar />
    <v-app-bar flat>
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="d-inline-block text-decoration-none"
        >
          <app-logo />
        </nuxt-link>
      </v-toolbar-title>
      <client-only>
        <template #fallback>
          <v-btn
            :active="false"
            to="/login"
            icon="mdi-login"
            color="primary"
            title="Sign in"
          />
        </template>
        <v-menu v-if="user">
          <template #activator="{ props }">
            <v-btn
              variant="text"
              color="primary"
              icon="mdi-alien"
              v-bind="props"
            />
          </template>
          <v-list>
            <v-list-item
              to="/account"
              title="Account"
            />
            <v-list-item
              to="/my-decks"
              title="My decks"
            />
            <v-list-item
              to="/logout"
              title="Log out"
            />
          </v-list>
        </v-menu>
        <v-btn
          v-else
          :active="false"
          to="/login"
          icon="mdi-login"
          color="primary"
          title="Sign in"
        />
      </client-only>
    </v-app-bar>
    <app-navigation />
    <v-main style="--v-layout-top: 64px">
      <slot />
    </v-main>
    <v-footer
      app
      style="z-index: 1004"
    >
      &copy; {{ year }}
    </v-footer>
  </v-app>
</template>