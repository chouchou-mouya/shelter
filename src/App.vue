<template>
  <div :class="themeStyle">
    <router-view />
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import '@/assets/CSS/Base/_reset.scss'
import '@/assets/CSS/Layout/_main.scss'
const themeStyle = ref("theme-light");
provide("$theme", themeStyle);
</script>
