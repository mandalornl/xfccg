<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(async () => {
  if (!user.value) {
    return;
  }

  await navigateTo('/', {
    replace: true,
  });
});
</script>

<template>
  <x-container size="small">
    <p>Waiting for login...</p>
  </x-container>
</template>
