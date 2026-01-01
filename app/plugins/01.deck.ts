export default defineNuxtPlugin(() => {
  const { deckSize } = useDeckState();

  const onBeforeUnload = (event: Event) => {
    event.preventDefault();
  };

  watch(deckSize, (value) => {
    if (value) {
      window.addEventListener('beforeunload', onBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', onBeforeUnload);
    }
  });
});
