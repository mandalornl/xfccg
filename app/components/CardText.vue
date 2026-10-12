<script setup lang="ts">
import { h } from 'vue';

import IconResourcePool from '~/components/IconResourcePool.vue';
import IconConspiracyPool from '~/components/IconConspiracyPool.vue';
import IconStarPool from '~/components/IconStarPool.vue';

const {
  text = undefined,
  tag = 'div'
} = defineProps<{
  text?: string,
  tag?: string,
}>();

const render = () => (
  h(tag, {
    class: 'text-pre-wrap',
  }, text?.split(/(\[[RC*]P])|(\*{1,2}[^*]+\*{1,2})/).map((value) => {
    if (value === '[RP]') {
      return h(IconResourcePool, {
        small: true,
      });
    }

    if (value === '[CP]') {
      return h(IconConspiracyPool, {
        small: true,
      });
    }

    if (value === '[*P]') {
      return h(IconStarPool, {
        small: true,
      });
    }

    if (value?.startsWith('**') && value?.endsWith('**')) {
      return h('b', [
        value.slice(2, -2),
      ]);
    }

    if (value?.startsWith('*') && value?.endsWith('*')) {
      return h('i', [
        value.slice(1, -1),
      ]);
    }

    return value;
  }))
);
</script>

<template>
  <render />
</template>
