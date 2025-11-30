<script setup lang="ts">
import { useGoTo } from 'vuetify';

const route = useRoute();
const user = useSupabaseUser();
const appNavigationState = useAppNavigationState();
const goTo = useGoTo();

const year = computed<number>(() => new Date().getFullYear());
const showScrollToTop = ref<boolean>(false);

const onClickScrollToTop = async () => {
  if (route.hash) {
    await navigateTo({
      ...route,
      hash: undefined,
    }, {
      replace: true,
    });
  }

  await goTo(0);
};

const scroll = () => {
  showScrollToTop.value = window.scrollY > 64;
};

onMounted(() => {
  window.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scroll);
});
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
        <template #activator="{ props:menuProps }">
          <v-btn
            v-tooltip:top="`Greetings! ${user?.user_metadata?.full_name}`"
            variant="text"
            color="primary"
            icon="mdi-alien"
            v-bind="menuProps"
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
            to="/logout"
            title="Log Out"
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
      <v-fab-transition>
        <v-fab
          :active="showScrollToTop"
          absolute
          offset
          location="top right"
          color="primary"
          icon="mdi-chevron-up"
          class="mr-4"
          @click="onClickScrollToTop"
        />
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>
