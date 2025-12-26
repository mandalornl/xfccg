<script setup lang="ts">
const resource = useState<number>('resources:resource', () => 5);
const conspiracy = useState<number>('resources:conspiracy', () => 5);
const wakeLock = ref<WakeLockSentinel>();
const isFullscreen = ref<boolean>(false);

useHead({
  title: 'Resources',
});

watch(isFullscreen, async (value) => {
  try {
    if (value) {
      wakeLock.value = await navigator.wakeLock.request('screen');

      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } else {
      await wakeLock.value?.release();
      wakeLock.value = undefined;

      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  } catch (error) {
    useDebug(error);
  }
});

const reset = () => {
  resource.value = 5;
  conspiracy.value = 5;
};
</script>

<template>
  <layout-content size="medium">
    <div class="d-flex justify-end ga-2 mb-3">
      <v-btn
        v-tooltip:top="'Fullscreen'"
        variant="text"
        icon="mdi-fullscreen"
        @click="isFullscreen = true"
      />
      <v-btn
        v-tooltip:top="'Reset'"
        variant="text"
        icon="mdi-refresh"
        @click="reset"
      />
    </div>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
      >
        <v-responsive aspect-ratio="1">
          <resource-counter
            v-model="resource"
            color="blue"
            class="rounded-s rounded-e-0"
          />
        </v-responsive>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-responsive aspect-ratio="1">
          <resource-counter
            v-model="conspiracy"
            color="red"
            class="rounded-e rounded-s-0"
          />
        </v-responsive>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isFullscreen"
      fullscreen
    >
      <v-btn
        v-tooltip:top="'Exit Fullscreen'"
        variant="text"
        icon="mdi-close"
        color="white"
        class="position-absolute"
        @click="isFullscreen = false"
      />
      <v-row
        no-gutters
        class="flex-column fill-height"
      >
        <v-col>
          <resource-counter
            v-model="resource"
            fullscreen
            color="blue"
          />
        </v-col>
        <v-col>
          <resource-counter
            v-model="conspiracy"
            fullscreen
            color="red"
          />
        </v-col>
      </v-row>
    </v-dialog>
  </layout-content>
</template>

<style lang="scss" scoped>
.position-absolute {
  top: 8px;
  right: 8px;

  z-index: 1;
}
</style>
