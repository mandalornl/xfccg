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
  <div>Waiting for login...</div>
</template>