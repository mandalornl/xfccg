export const useScrollPosition = () => {
  const scrollPositionState = useScrollPositionState();

  const onScroll = () => {
    scrollPositionState.value = {
      top: window.scrollY,
      left: window.scrollX,
    };
  };

  onMounted(() => {
    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);

    scrollPositionState.value = {
      top: 0,
      left: 0,
    };
  });
};