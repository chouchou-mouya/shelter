<template>
  <div class="animal">
    <SearchBar :search_item="search_item"></SearchBar>
  </div>
</template>

<style lang="scss">
.animal {
  padding-top: 50px;
  min-height: 100vh;
}
</style>
<script setup>
import SearchBar from "../components/SearchBar.vue";
const search_item = {
  animal_kind: {
    label: "種類",
    value: "",
    type: "select",
    options: [
      { label: "貓", value: "貓" },
      { label: "狗", value: "狗" },
    ],
  },
};
</script>
