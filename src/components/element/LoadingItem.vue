<template>
  <div class="loading">
    <div class="loading-content">
      <div class="loading-icon"></div>
      <p>Loading</p>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.loading {

  &-content {
    position: relative;
    padding:30px;
    display: grid;
    justify-items: center;
  }
  &-icon {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background: var(--strong-color);
    @include ani(heartbeat, 1s, infinite);
  }
  p {
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
<script>
export default {
  name: "LoadingItem",
};
</script>
<script setup>
</script>
