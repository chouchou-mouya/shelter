<script setup>
import { ref } from "@vue/reactivity";
import HelloWorld from "./components/HelloWorld.vue";
const theme = ref("theme-light");
const html = document.querySelector("html");
html.dataset.theme = theme.value;
console.log(html.dataset.theme);
console.log(window.matchMedia);

const changeTheme = () => {
  theme.value = theme.value == "theme-light" ? "theme-dark" : "theme-light";
  html.dataset.theme = theme.value;
};
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="content" :class="theme">
    <div>
      <button class="content__btn" @click="changeTheme">
        123a
        <p>TEST</p>
      </button>
    </div>
  </div>

  <HelloWorld msg="Vite + Vue" />
</template>


<style lang="scss" scoped>

.content {
  background: #fff;
  border: 1px solid #ccc;
  &__btn {
    width: 200px;
    padding: 20px;
    background: var(--primary_color);
    & p{
      color: #fff;
    }
  }
}
</style>
