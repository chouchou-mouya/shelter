<template>
  <div class="head">
    <div class="logo">LOGO</div>
    <nav>
      <div
        v-for="head in heads"
        :key="head.value"
        @click="goRouter(head)"
        :class="is_route == head.value ? 'click' : false"
      >
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
  .logo {
    padding: 20px 50px;
    font-family: "Nunito", sans-serif;
    @include pad() {
      padding: 20px 20px;
    }
  }
  nav {
    font-family: "Nunito", sans-serif;
    display: flex;
    justify-content: flex-end;
    padding: 20px 30px;
    > div {
      cursor: pointer;
      padding: 5px 10px;
      &:hover {
        background: #fff;
        border-radius: 10px;
      }
      &.click{
        transition: 0.3s;
        color: var(--primary-color);
      }
      /* &.click::after {
        content: "";
        display: block;
        width: 100%;
        position: relative;
        top: 5px;
        height: 2px;
        background: var(--primary-color);
      } */
    }
    @include pad() {
      padding: 20px 20px;
    }
  }
}
</style>
<script setup>
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

defineProps({
  heads: Array,
});
const $route = useRoute();
const $router = useRouter();
const is_route = ref($route.name);
const goRouter = ({ value }) => {
  $router.push({
    name: value,
  });
};
onBeforeRouteUpdate((to) => {
  is_route.value = to.name;
});
</script>
