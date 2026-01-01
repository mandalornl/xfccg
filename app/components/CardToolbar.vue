<script setup lang="ts">
const search = defineModel<string>('search', {
  default: '',
});

const clickIcon = (event: Event) => {
  const target = event.target as HTMLElement;
  const input = target.closest('.v-input')?.querySelector('input') as HTMLInputElement;

  search.value = input?.value || '';
};
</script>

<template>
  <v-toolbar
    height="auto"
    color="grey-darken-4"
    class="rounded-t position-sticky"
  >
    <div class="pa-3 flex-fill">
      <div class="d-flex flex-column flex-sm-row justify-sm-space-between">
        <v-text-field
          :model-value="search"
          flat
          clearable
          hide-details
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          type="search"
          @click:clear="search = ''"
          @click:prepend-inner="clickIcon"
          @focus="$event.target.select()"
          @keydown.exact.enter="search = $event.target.value"
        />
        <div class="d-flex align-center mt-2 mt-sm-0 ml-sm-4 ga-2 pr-2">
          <slot />
        </div>
      </div>
    </div>
  </v-toolbar>
</template>
