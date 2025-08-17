import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    const scrollPositionState = useScrollPositionState();

    if (scrollPositionState.value.top > 0 || scrollPositionState.value.left > 0) {
      return scrollPositionState.value;
    }

    return {
      top: 0,
      left: 0,
    };
  }
};