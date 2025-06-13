<script lang="ts" setup>
</script>

<template>
  <div class="app-logo">
    The
    <div class="app-logo__alpha-x">
      <v-icon
        icon="mdi-alpha-x"
        size="large"
      />
    </div>
    Files CCG
  </div>
</template>

<style lang="scss" scoped>
.app-logo {
  font-size: 1.25rem;
  line-height: 1.5;

  display: flex;
  flex-wrap: nowrap;

  color: white;
}

.app-logo__alpha-x {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid red;
  border-radius: 50%;

  width: 30px;
  height: 30px;

  margin: 0 4px;
}
</style>