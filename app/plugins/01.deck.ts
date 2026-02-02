export default defineNuxtPlugin(() => {
  const deckbuilder = useDeckbuilder();

  const onBeforeUnload = (event: Event) => {
    event.preventDefault();
  };

  watch(deckbuilder.size, (value) => {
    if (value) {
      window.addEventListener('beforeunload', onBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', onBeforeUnload);
    }
  });
});
