<script lang="ts" setup>
const user = useSupabaseUser();

watchEffect(async () => {
  if (!user.value) {
    return;
  }

  await navigateTo('/');
});
</script>

<template>
  <layout-content size="small">
    <p>Waiting for login...</p>
  </layout-content>
</template>