<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { smAndUp } = useDisplay();
const appNavigationState = useAppNavigationState();

watch(smAndUp, (value) => {
  if (!value) {
    return;
  }

  appNavigationState.value = false;
});

const items = [
  {
    title: 'Home',
    props: {
      to: '/',
      prependIcon: 'mdi-home',
    },
  },
  {
    title: 'Cards',
    props: {
      to: '/cards',
      prependIcon: 'mdi-cards',
    },
  },
  {
    title: 'Agents',
    props: {
      to: '/agents',
      prependIcon: 'mdi-police-badge',
    },
  },
  {
    title: 'Decklists',
    props: {
      to: '/decklists',
      prependIcon: 'mdi-text-box-multiple',
    },
  },
  {
    title: 'Checklist',
    props: {
      to: '/checklist',
      prependIcon: 'mdi-format-list-checks',
    },
  },
  {
    title: 'Resources',
    props: {
      to: '/resources',
      prependIcon: 'mdi-dice-d20',
    },
  },
  {
    title: 'Cube',
    props: {
      to: '/cube',
      prependIcon: 'mdi-cube-outline',
    },
  },
  {
    title: 'Rules',
    props: {
      to: '/rules',
      prependIcon: 'mdi-book-open-variant',
    },
  },
  {
    title: 'FAQ',
    props: {
      to: '/faq',
      prependIcon: 'mdi-help-circle',
    },
  },
  {
    title: 'Archive',
    props: {
      to: '/archive',
      prependIcon: 'mdi-archive',
    },
  },
];
</script>

<template>
  <v-navigation-drawer
    v-model="appNavigationState"
    :permanent="smAndUp"
    :rail="smAndUp"
    :expand-on-hover="smAndUp"
  >
    <v-list
      :items="items"
      nav
      color="primary"
    />
  </v-navigation-drawer>
</template>
