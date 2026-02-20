<script setup lang="ts">
import {
  useDisplay,
  useTheme,
} from 'vuetify';

const { smAndUp } = useDisplay();
const theme = useTheme();
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
      prependIcon: 'mdi-dna',
    },
  },
  {
    title: 'Checklist',
    props: {
      to: '/checklist',
      prependIcon: 'mdi-file-cabinet',
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
    title: 'FCU Cube',
    props: {
      to: '/fcu-cube',
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

const isLight = computed<boolean>(() => theme.name.value === 'light');
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
    <template #append>
      <v-list
        nav
        color="primary"
      >
        <v-list-item
          :title="isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
          @click="theme.toggle()"
        >
          <template #prepend>
            <v-icon
              :color="isLight ? 'orange-accent-3' : undefined"
              :icon="isLight ? 'mdi-white-balance-sunny' : 'mdi-power-sleep'"
            />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
