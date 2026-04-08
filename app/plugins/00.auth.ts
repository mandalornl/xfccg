export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient();
  const currentUser = useSupabaseUser();

  const { data } = await supabase.auth.getClaims();

  currentUser.value = data?.claims ?? null;
});
