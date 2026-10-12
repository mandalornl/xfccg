<script setup lang="ts">
const router = useRouter();

const { page } = defineProps<{
  page: string;
}>();

const onIntersect = (isIntersecting: boolean) => {
  if (!isIntersecting) {
    return;
  }

  const resolvedRoute = router.resolve({
    hash: `#${page}`,
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
