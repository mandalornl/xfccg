<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title?: string,
  size?: 'small' | 'medium' | 'large',
}>(), {
  title: undefined,
  size: undefined,
});

const small = computed(() => props.size === 'small' && ({
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4,
}));

const medium = computed(() => props.size === 'medium' && ({
  lg: 11,
  xl: 9,
}));

const cols = computed(() => small.value || medium.value || undefined);
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col v-bind="cols">
        <h1
          v-if="title"
          v-text="title"
          class="text-h4 mb-4"
        />
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>