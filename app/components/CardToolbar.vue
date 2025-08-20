<script setup lang="ts">
const search = defineModel<string>('search', {
  default: '',
});
</script>

<template>
  <v-toolbar
    height="auto"
    color="grey-darken-4"
    class="rounded-t-lg position-sticky"
  >
    <div class="pa-3 flex-fill">
      <v-menu
        :close-on-content-click="false"
        origin="overlap"
        width="100%"
      >
        <template #activator="{ props:menuProps }">
          <v-badge
            :model-value="search !== ''"
            dot
            color="primary"
            class="hidden-sm-and-up"
          >
            <v-btn
              :active="search !== ''"
              rounded
              icon="mdi-magnify"
              active-color="primary"
              v-bind="menuProps"
            />
          </v-badge>
        </template>
        <v-list>
          <v-list-item>
            <v-text-field
              :model-value="search"
              flat
              clearable
              hide-details
              autofocus
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              type="search"
              @click:clear="search = ''"
              @focus="$event.target.select()"
              @keydown.exact.enter="search = $event.target.value"
            />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-text-field
        :model-value="search"
        flat
        clearable
        hide-details
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        type="search"
        class="hidden-xs"
        @click:clear="search = ''"
        @focus="$event.target.select()"
        @keydown.exact.enter="search = $event.target.value"
      />
    </div>
    <template #append>
      <div class="d-flex align-center ga-2 pa-3">
        <slot />
      </div>
    </template>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.v-toolbar {
  top: 64px;

  z-index: 1;
}
</style>