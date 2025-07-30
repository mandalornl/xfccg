<script setup lang="ts">
import { h  } from 'vue';
import type {Component} from 'vue';

import IconResourcePool from '~/components/IconResourcePool.vue';
import IconConspiracyPool from '~/components/IconConspiracyPool.vue';
import IconStarPool from '~/components/IconStarPool.vue';

const props = withDefaults(defineProps<{
  text?: string,
  tag?: string,
}>(), {
  text: undefined,
  tag: 'div',
});

const components: Record<string, Component> = {
  '[RP]': IconResourcePool,
  '[CP]': IconConspiracyPool,
  '[*P]': IconStarPool,
};

const render = () => (
  h(props.tag, {
    class: 'text-pre-wrap',
  }, props.text?.split(/(\[[RC*]P])/).map((value) => {
    const component = components[value];

    if (component) {
      return h(component, {
        small: true,
      });
    }

    return value;
  }))
);
</script>

<template>
  <render />
</template>