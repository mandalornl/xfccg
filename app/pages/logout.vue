<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

useHead({
  title: 'Logout',
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
  <x-container size="small">
    <h1 class="text-headline-large">
      Logging out...
    </h1>
    <a
      href="#"
      @click.prevent="signOut"
      v-text="'Click here'"
    /> if nothing has happened after 5 seconds.
  </x-container>
</template>
