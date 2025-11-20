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
  <layout-content size="small">
    <p>Waiting for login...</p>
  </layout-content>
</template>
