<script setup lang="ts">
const snackbarState = useSnackbarState();

const props = defineProps<{
  hash?: string | number;
  href?: string;
  iconColor?: string;
}>();

const copyToClipboard = async (event: Event) => {
  snackbarState.reset();

  try {
    const target = event.currentTarget as HTMLAnchorElement;

    await navigator.clipboard.writeText(target.href);

    snackbarState.success('Copied to clipboard.');
  } catch {
    snackbarState.error('Failed to copy to clipboard.');
  }
};

const url = computed<string>(() => {
  if (props.hash) {
    return `#${props.hash}`;
  }

  return props.href || '/';
});
</script>

<template>
  <div class="d-flex align-baseline ga-2">
    <slot />
    <v-btn
      v-tooltip:top="'Copy link to clipboard'"
      :href="url"
      target="_blank"
      variant="text"
      size="small"
      color="primary"
      icon="mdi-content-copy"
      @click.prevent="copyToClipboard"
    />
  </div>
</template>
