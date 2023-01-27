<template>
  <div class="toolobox" :style="setPosition">
    <div class="toolbox-item" v-for="(d, index) in props.data" :key="index">
      <p :style="setColor(d.label)"></p>
      {{ d.label }} {{ d.value }}
    </div>
  </div>
</template>

<style lang="scss">
.toolobox {
  position: absolute;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  opacity: 0.9;
  font-size: 13px;
  border: 1px solid #eee;
  @include shadow(5px, 5px, 10px, -5px);
  .toolbox-item {
    display: flex;
    margin: 7px 0;
    p {
      width: 10px;
      height: 10px;
      border-radius: 50px;
      margin-right: 5px;
    }
  }
}
</style>
<script>
import { computed } from "vue-demi";
export default {
  name: "tool-box",
};
</script>

<script setup>
const props = defineProps({
  data: Array,
  position: Object,
  color: Function,
});

const setPosition = computed(() => {
  return `left:${props.position.x}px;top:${props.position.y}px`;
});

const setColor = (label) => {
  const c = props.color(label);
  return `background:hsl(${c.h},${c.s * 100}%,${c.l * 100}%)`;
};
</script>
