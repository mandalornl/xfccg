<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  middleware: [
    'authenticated',
  ],
});

let timeoutId: ReturnType<typeof setTimeout>;

const signOut = async () => {
  clearTimeout(timeoutId);

  const { error } = await supabase.auth.signOut();

  if (error) {
    useDebug(error);
  }
};

onMounted(() => {
  timeoutId = setTimeout(signOut, 1000);
});

watch(user, async (value) => {
  if (value) {
    return;
  }

  await navigateTo('/', {
    replace: true,
  });
});
</script>

<template>
  <layout-content
    title="Logging out..."
    size="small"
  >
    <a
      href="#"
      @click.prevent="signOut"
      v-text="'Click here'"
    /> if nothing has happened after 5 seconds.
  </layout-content>
</template>