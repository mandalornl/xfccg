<script setup lang="ts">
const snackbarState = useSnackbarState();

defineProps<{
  value: string | number,
  iconColor?: string,
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
  <div class="d-flex align-center ga-2">
    <slot />
    <a
      v-tooltip:top="'Copy link to section'"
      :href="`#${value}`"
      @click.prevent="copyToClipboard"
    >
      <v-icon
        :color="iconColor"
        icon="mdi-content-copy"
        size="small"
      />
    </a>
  </div>
</template>