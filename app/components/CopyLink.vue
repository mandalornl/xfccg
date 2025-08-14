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
    <v-tooltip
      location="top"
      content-class="bg-primary"
    >
      <template #activator="{ props: tooltipProps }">
        <a
          :href="`#${value}`"
          v-bind="tooltipProps"
          @click.prevent="copyToClipboard"
        >
          <v-icon
            :color="iconColor"
            icon="mdi-content-copy"
            size="small"
          />
        </a>
      </template>
      Copy link to this section
    </v-tooltip>
  </div>
</template>