<script setup lang="ts">
import { CardSet } from '~/types/card';

useHead({
  title: 'Checklist',
});

const tabs = [
  CardSet.Premiere,
  CardSet.ApologyIsPolicy,
].map((set) => ({
  set,
  route: {
    name: 'checklist',
    query: {
      set,
    },
  },
}));

definePageMeta({
  middleware: (to) => {
    if (to.query.set) {
      return;
    }

    return navigateTo(tabs[0]?.route, {
      replace: true,
    });
  },
});

const activeTab = ref<CardSet>();
</script>

<template>
  <layout-content
    fluid
    title="Checklist"
    size="large"
  >
    <v-tabs
      v-model="activeTab"
      color="primary"
    >
      <v-tab
        v-for="tab of tabs"
        :key="`tab-${tab.set}`"
        :to="tab.route"
        :text="tab.set"
        :value="tab.set"
        replace
        exact
      />
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item
        v-for="tab of tabs"
        :key="`item-${tab.set}`"
        :value="tab.set"
      >
        <x-checklist :set="tab.set" />
      </v-tabs-window-item>
    </v-tabs-window>
  </layout-content>
</template>
