<template>
  <div ref="g_popup">
    <div class="g-popup" v-if="status">
      <div class="popup-bg"></div>
      <div class="popup-inner">
        <div class="popup-close" @click="close">
          <font-awesome-icon icon="xmark" />
        </div>
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.g-popup {
  top: 0;
  width: 100%;
  position: fixed;
  z-index: 99;
  .popup-bg {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0px;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: -1;
  }
  .popup-inner {
    top: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .popup-close{
    display: flex;
    justify-content: flex-end;
    svg{
      cursor: pointer;
      font-size: 23px;
      color: #fff;
      &:hover{
        font-size: 25px;
      }
    }
  }
  .popup-content{
    margin-top: 10px;
    background: #fff;
    padding:20px;
    border-radius: 7px;
    border: 1px solid #eee;
  }
}
</style>
<script>
import { computed, onMounted, ref } from "vue-demi";
export default {
  name: "popup",
};
</script>

<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const g_popup = ref(null);
const emit = defineEmits(["update:modelValue"]);

const status = computed(() => {
  return props.modelValue;
});

const close = () => {
  emit("update:modelValue", false);
};
const appendRoot = (dom) => {
  const container = document.body;
  container.appendChild(dom);
};
onMounted(() => {
  const popup_check = g_popup.value;
  appendRoot(popup_check);
  //create dom on bottom
});
</script>
