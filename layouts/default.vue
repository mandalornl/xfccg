<script lang="ts" setup>
const user = useSupabaseUser();
const appNavigationState = useAppNavigationState();

const year = computed<number>(() => new Date().getFullYear());
</script>

<template>
  <v-app>
    <admiral-snackbar />
    <v-app-bar flat>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="appNavigationState = !appNavigationState"
      />
      <v-toolbar-title class="d-flex">
        <nuxt-link
          to="/"
          class="d-block text-decoration-none"
        >
          <v-img
            src="/logo.svg"
            alt="The X-Files CCG"
            width="200"
            height="40"
          />
        </nuxt-link>
      </v-toolbar-title>
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
            title="My Decks"
          />
          <v-list-item
            to="/my-agents"
            title="My Agents"
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