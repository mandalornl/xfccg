<script setup lang="ts">
const snackbarState = useSnackbarState();

defineProps<{
  value: string | number;
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
</script>

<template>
  <div class="d-flex align-baseline ga-2">
    <slot />
    <v-btn
      v-tooltip:top="'Copy link to clipboard'"
      :href="`#${value}`"
      variant="text"
      size="small"
      color="primary"
      icon="mdi-content-copy"
      @click.prevent="copyToClipboard"
    />
  </div>
</template>
