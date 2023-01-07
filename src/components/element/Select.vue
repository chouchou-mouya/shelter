<template>
  <div>
    <input
      v-model="value"
      type="text"
      :placeholder="props.placeholder"
      :class="enableFilter"
      @click="open"
    />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input {
  cursor: pointer;
  pointer-events: none;
  @include placeholder();
  &.filter_able {
    pointer-events: auto;
  }
}
</style>
<script setup>
import { computed, ref } from "@vue/runtime-core";

const props = defineProps({
  modelValue: [String, Array],
  placeholder: String,
  filter: {
    default: false,
    type: Boolean,
  },
});
const enableFilter = computed(() => {
  if (props.filter) {
    return "filter_able";
  }
});
const emits = defineEmits(["update:modelValue"]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
const open = () => {
  const mountNode = document.createElement("div");
  const appNode = document.getElementById("app");
  appNode.appendChild(mountNode);
};
</script>
