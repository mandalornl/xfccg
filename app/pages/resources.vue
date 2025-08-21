<script setup lang="ts">
const resource = ref<number>(5);
const conspiracy = ref<number>(5);
const wakeLock = ref<WakeLockSentinel>();
const dialog = ref<boolean>(false);

useHead({
  title: 'Resources',
});

watch(dialog, async (value) => {
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
  <layout-content>
    <div class="d-flex justify-end ga-2 mb-3">
      <v-btn
        text="Fullscreen"
        variant="flat"
        @click="dialog = true"
      />
      <v-btn
        text="Reset"
        variant="flat"
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
          />
        </v-responsive>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <v-btn
        icon="mdi-close"
        color="black"
        variant="text"
        class="position-absolute"
        @click="dialog = false"
      />
      <v-row
        no-gutters
        class="flex-column fill-height"
      >
        <v-col>
          <resource-counter
            v-model="resource"
            rotate
            color="blue"
          />
        </v-col>
        <v-col>
          <resource-counter
            v-model="conspiracy"
            rotate
            color="red"
          />
        </v-col>
      </v-row>
    </v-dialog>
  </layout-content>
</template>

<style lang="scss" scoped>
.position-absolute {
  top: 4px;
  left: 4px;
  z-index: 1;
}
</style>