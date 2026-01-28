export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient();

  const initSession = async () => {
    const currentSession = useSupabaseSession();

    const { data } = await supabase.auth.getSession();

    currentSession.value = data?.session ?? null;
  };

  const initUser = async () => {
    const currentUser = useSupabaseUser();

    const { data } = await supabase.auth.getClaims();

    currentUser.value = data?.claims ?? null;
  };

  await initSession();
  await initUser();
});
