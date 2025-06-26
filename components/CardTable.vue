<script lang="ts" setup>
defineProps<{
  title?: string,
  value?: { [text: string]: string | number },
}>();
</script>

<template>
  <div class="card-table">
    <div
      v-if="title"
      class="font-weight-medium"
    >
      {{ title }}
    </div>
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
  </div>
</template>