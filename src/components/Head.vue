<template>
  <div class="head">
    <div class="logo">
      LOGO
    </div>
    <nav>
      <div v-for="head in heads" :key="head.value">
        {{ head.label }}
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
.head {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 50px;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo{
    padding: 20px 50px;
    font-family: "Nunito", sans-serif;
  }
  nav {
    font-family: "Nunito", sans-serif;
    display: flex;
    justify-content: flex-end;
    padding: 20px 50px;
  }
}
</style>
<script setup>
defineProps({
  heads: Array,
});
</script>
