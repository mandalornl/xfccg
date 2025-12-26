<script setup lang="ts">
const router = useRouter();

const props = defineProps<{
  page: string;
}>();

const onIntersect = (isIntersecting: boolean) => {
  if (!isIntersecting) {
    return;
  }

  const resolvedRoute = router.resolve({
    hash: `#${props.page}`,
  });

  if (resolvedRoute.hash === location.hash) {
    return;
  }

  history.replaceState(history.state, '', resolvedRoute.href);
};
</script>

<template>
  <section
    :id="page"
    v-intersect.quiet="onIntersect"
    class="mb-4"
  >
    <slot />
    <p class="text-center">
      {{ page }}
    </p>
  </section>
</template>
