<script setup lang="ts">
const { size = undefined } = defineProps<{
  size?: 'x-small' | 'small' | 'medium' | 'large';
  fluid?: boolean;
}>();

const cols = computed(() => {
  if (!size) {
    return undefined;
  }

  if (size === 'x-small') {
    return {
      sm: 9,
      lg: 6,
      xl: 5,
      xxl: 4,
    };
  }

  if (size === 'small') {
    return {
      lg: 8,
      xl: 7,
      xxl: 6,
    };
  }

  if (size === 'medium') {
    return {
      lg: 10,
      xl: 9,
      xxl: 8,
    };
  }

  return {
    xl: 11,
    xxl: 10,
  };
});
</script>

<template>
  <v-container :fluid="fluid">
    <v-row class="justify-center">
      <v-col v-bind="cols">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>
