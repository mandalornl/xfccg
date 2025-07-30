<script setup lang="ts">
defineProps<{
  value?: Record<string, string | number>,
}>();
</script>

<template>
  <v-table
    hover
    density="compact"
  >
    <tbody>
      <tr
        v-for="(text, key) of value"
        :key="key"
        class="text-medium-emphasis"
      >
        <td>{{ key }}</td>
        <td>{{ text }}</td>
      </tr>
    </tbody>
  </v-table>
</template>