<script setup lang="ts">
import { CardSet } from '~/types/card';
import { slugify } from '~/utils/slugify';

useHead({
  title: 'Checklist',
});

const tabs = [
  {
    text: CardSet.Premiere,
    value: slugify(CardSet.Premiere),
  },
  {
    text: CardSet.ApologyIsPolicy,
    value: slugify(CardSet.ApologyIsPolicy),
  },
];

definePageMeta({
  middleware: (to) => {
    if (to.name !== 'checklist') {
      return;
    }

    return navigateTo({
      name: 'checklist-set',
      params: {
        set: tabs[0]?.value,
      },
    }, {
      replace: true,
    });
  },
});

const activeTab = ref<string>(tabs[0]?.value || '');
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
        :key="`tab-${tab.value}`"
        :to="{ name: 'checklist-set', params: { set: tab.value } }"
        :value="tab.value"
        :text="tab.text"
      />
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item
        v-for="tab of tabs"
        :key="`item-${tab.value}`"
        :value="tab.value"
      >
        <nuxt-page :item="tab" />
      </v-tabs-window-item>
    </v-tabs-window>
  </layout-content>
</template>
