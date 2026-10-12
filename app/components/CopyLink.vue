<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router';

const snackbar = useSnackbar();

const {
  hash = undefined,
  href = undefined,
  to = undefined,
} = defineProps<{
  hash?: string | number;
  href?: string;
  to?: RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric;
}>();

const copyToClipboard = async (event: Event) => {
  snackbar.reset();

  try {
    const target = event.currentTarget as HTMLAnchorElement;

    await navigator.clipboard.writeText(target.href);

    snackbar.success('Copied to clipboard.');
  } catch {
    snackbar.error('Failed to copy to clipboard.');
  }
};

const url = computed<string | undefined>(() => {
  if (hash) {
    return `#${hash}`;
  }

  return href || undefined;
});
</script>

<template>
  <div class="d-flex align-baseline ga-2">
    <slot />
    <v-btn
      v-tooltip:top="'Copy link to clipboard'"
      :href="url"
      :to="to"
      target="_blank"
      variant="text"
      size="small"
      color="primary"
      icon="mdi-content-copy"
      @click.prevent="copyToClipboard"
    />
  </div>
</template>
