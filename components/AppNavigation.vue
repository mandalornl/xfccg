<script lang="ts" setup>
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
    title: 'Decks',
    props: {
      to: '/decks',
      prependIcon: 'mdi-wrench',
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
    title: 'Downloads',
    props: {
      to: '/downloads',
      prependIcon: 'mdi-archive',
    },
  },
];
</script>

<template>
  <v-navigation-drawer
    rail
    permanent
    expand-on-hover
  >
    <v-list
      :items="items"
      nav
      color="primary"
    />
  </v-navigation-drawer>
</template>