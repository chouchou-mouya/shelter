<template>
  <div class="home">
    <Head :heads="heads"></Head>
    <!-- <h1>23</h1>
    <button @click="change">Change</button> -->
    <div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.home {
  background: #eee;
  /* padding:30px; */
}
/* h1 {
  font-weight: bold;
  color: var(--primary_color);
} */
</style>

<script>
export default {
  name: "home-page",
};
</script>

<script setup>
import Head from "@/components/HeadBox.vue";
// const $theme = ref(inject("$theme"));x

const heads = [
  { label: "Search", value: "search" },
  { label: "Analyze", value: "analyze" },
];
</script>
