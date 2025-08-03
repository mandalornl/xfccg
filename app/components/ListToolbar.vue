<script setup lang="ts">
const slots = useSlots();

const search = defineModel<string>('search', {
  default: '',
});
</script>

<template>
  <v-toolbar
    :extended="!!slots.default"
    height="auto"
    extension-height="auto"
    color="grey-darken-4"
    class="mb-4"
  >
    <div class="pa-3 flex-fill">
      <v-text-field
        :model-value="search"
        clearable
        hide-details
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        type="search"
        @click:clear="search = ''"
        @focus="$event.target.select()"
        @keydown.exact.enter="search = $event.target.value"
      />
    </div>
    <template #extension>
      <div class="px-3 pb-3 d-flex align-center flex-fill flex-wrap ga-2">
        <slot />
      </div>
    </template>
  </v-toolbar>
</template>