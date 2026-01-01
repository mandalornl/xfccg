<script setup lang="ts">
import oldFaq from '~/assets/faq/old.json';
import newFaq from '~/assets/faq/new.json';

import type { Faq } from '~/types/faq';

const route = useRoute();
const router = useRouter();

useHead({
  title: 'FAQ',
});

const search = ref<string>(route.query.search as string || '');

watch(search, (value) => {
  const resolvedRoute = router.resolve({
    query: {
      search: value || undefined,
    },
  });

  if (resolvedRoute.fullPath === route.fullPath) {
    return;
  }

  return navigateTo(resolvedRoute, {
    replace: true,
  });
});

const filterItems = (items: Faq[]): Faq[] => {
  if (!search.value) {
    return items;
  }

  return items.filter((item) => (
    item.question.toLowerCase().includes(search.value.toLowerCase())
    || item.answer.toLowerCase().includes(search.value.toLowerCase())
  ));
};

const oldItems = computed<Faq[]>(() => filterItems(oldFaq));
const newItems = computed<Faq[]>(() => filterItems(newFaq));

const clickIcon = (event: Event) => {
  const target = event.target as HTMLElement;
  const input = target.closest('.v-input')?.querySelector('input') as HTMLInputElement;

  search.value = input?.value || '';
};
</script>

<template>
  <layout-content size="medium">
    <v-text-field
      :model-value="search"
      clearable
      placeholder="Search"
      type="search"
      prepend-inner-icon="mdi-magnify"
      @click:clear="search = ''"
      @click:prepend-inner="clickIcon"
      @focus="$event.target.select()"
      @keyup.exact.enter="search = $event.target.value"
    />
    <template v-if="oldItems.length > 0">
      <h2>1997 FREQUENTLY ASKED QUESTIONS</h2>
      <p><small>(recreated from the original 1997 USPC website FAQ's)</small></p>
      <v-expansion-panels
        variant="accordion"
        class="mb-4"
      >
        <v-expansion-panel
          v-for="item of oldItems"
          :key="item.question"
        >
          <v-expansion-panel-title>
            <mark-text
              :highlight="search"
              :text="item.question"
            />
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <mark-text
              :highlight="search"
              :text="item.answer"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template v-if="newItems.length > 0">
      <h2>2021 FREQUENTLY ASKED QUESTIONS</h2>
      <p><small>(created to support the first XFCCG virtual tournament)</small></p>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="item of newItems"
          :key="item.question"
        >
          <v-expansion-panel-title>
            <mark-text
              :highlight="search"
              :text="item.question"
            />
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <mark-text
              :highlight="search"
              :text="item.answer"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
    <template v-if="oldItems.length === 0 && newItems.length === 0">
      No results found.
    </template>
  </layout-content>
</template>
