<script lang="ts" setup>
const props = defineProps<{
  text: string,
}>();

const color = computed(() => ({
  'Adversary': 'green-darken-2',
  'Agent': 'white',
  'Bluff': 'grey-darken-1',
  'Combat': 'red-darken-4',
  'Equipment': 'light-blue-darken-3',
  'Event': 'pink-darken-2',
  'Site': 'blue-darken-4',
  'Witness': 'purple-darken-1',
  'X-File': 'yellow',
  'Credits': 'orange-darken-2',
}[props.text]));
</script>

<template>
  <v-chip
    :text="text"
    :color="color"
    label
    variant="flat"
  />
</template>