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
  <v-sheet class="position-sticky pa-3">
    <div class="d-flex flex-column flex-sm-row flex-fill ga-2">
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
      <div class="d-flex align-center ga-2 pr-2">
        <slot />
      </div>
    </div>
  </v-sheet>
</template>
