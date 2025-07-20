export default defineNuxtRouteMiddleware((to, from) => {
  const routeFromState = useRouteFromState();

  routeFromState.value = {
    name: from.name,
    path: from.path,
    query: from.query,
    hash: from.hash,
    fullPath: from.fullPath,
    params: from.params,
  };
});