<script setup lang="ts">
type Item = {
  label: string,
  hash?: number,
  children?: Item[],
};

defineProps<{
  items: Item[],
}>();
</script>

<template>
  <ul>
    <li
      v-for="item of items"
      :key="item.label"
    >
      <hash-link
        v-if="item.hash"
        :value="item.hash"
      >
        {{ item.label }}
      </hash-link>
      <template v-else>
        {{ item.label }}
      </template>
      <unordered-list
        v-if="item.children?.length"
        :items="item.children"
      />
    </li>
  </ul>
</template>
