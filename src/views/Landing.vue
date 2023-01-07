<template>
  <div class="landing">
    <div class="contain">
      <div class="slogan">
        <h1>Find <span>Family</span> for You!</h1>
        <p>
          全台收容所有 10000+ 毛小孩正在等待他們的新家人<br />
          希望你能在這裡找到最佳夥伴
        </p>
      </div>
      <div class="search_box">
        <!-- @click="focusInput(index)" -->
        <div
          class="search_item"
          :style="setWidth(item.width)"
          v-for="(item, key, index) in search_item"
          :key="key"
        >
          <font-awesome-icon :icon="item.icon" />
          <template v-if="item.type == 'select'">
            <!-- <Select v-model:modelValue="item.value" :placeholder="item.label" filter>
            <Options></Options>
          </Select> -->
            <el-select
              clearable
              v-model="item.value"
              :placeholder="item.label"
              @click="setIconColor"
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
                {{ option.label }}
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type == 'input'">
            <input :ref="setRef" type="text" :placeholder="item.label" />
          </template>
        </div>
      </div>
      <div class="search_btn">
        <button>
          Search Now !
        </button>
      </div>

    </div>

    <div class="bg"></div>
  </div>
</template>

<style lang="scss">
.landing {
  position: relative;
  z-index: 1;
  .contain {
    border-radius: 20px;
    width: fit-content;
    position: relative;
    /* transform: translateX(-50%); */
    left: 5%;
    top: 100px;
    /* background: rgba(255, 255, 255, 0.7); */
  }
  .slogan {
    padding-top: 10px;
    text-align: center;
    letter-spacing: 1px;
    h1 {
      font-family: "Nunito", sans-serif;
      font-size: 40px;
      span {
        text-decoration: wavy underline;
        text-underline-offset: 10px;
        text-decoration-thickness: 3px;
        color: var(--strong_color);
      }
    }
    p {
      margin-top: 25px;
      font-size: 13px;
      line-height: 20px;
    }
  }
  .search_box {
    cursor: pointer;
    width: min-content;
    background: #fff;
    border-radius: 13px;
    border: 1px solid $beige;
    position: relative;
    left: 50%;
    padding: 10px 10px;
    transform: translateX(-50%);
    margin: 20px 0;
    display: flex;
    .search_item {
      display: flex;
      align-items: center;
      margin: 0 5px;
      padding: 0 10px;
      & + .search_item {
        border-left: 1px solid #e1e1e1;
      }
    }
    .el-select {
      //重新定義顏色
      --orange: #fff;
      --el-select-border-color-hover: var(--orange);
      --el-select-disabled-border: var(--orange);
      --el-select-close-hover-color: var(--orange);
      --el-select-input-color: var(--orange);
      --el-select-input-focus-border-color: var(--orange);
      .el-input {
        --el-input-border: var(--orange);
        --el-input-hover-border: var(--orange);
        --el-input-focus-border: var(--orange);
        --el-input-focus-border-color: var(--orange);
        --el-input-border-color: var(--orange);
      }
    }

    svg {
      color: #6e6e6e;
      font-size: 20px;
    }
    input {
      padding: 20px 10px;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  .search_btn{
    button{
      padding:15px;
      font-size: 20px;
      border-radius: 20px;
      color: #fff;
      background: var(--primary_color);
      font-family: "Nunito", sans-serif;
      @include shadow(10px,10px,20px,-5px);
      &:hover{
        transition: 0.1s;
        font-size: 22px;
        background: var(--primary_color_darken);
      }
      &:active{
        background: var(--primary_color_darkenest);
      }
    }
  }
  .bg {
    /* background: url(../assets/images/pexels-vlad-bagacian-1634838.jpeg) no-repeat center ; */
    width: 100%;
    background-size: cover;
    height: 100vh;
    position: absolute;
    top: 0px;
    z-index: -1;
  }
}
</style>
<script setup>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import moment from "moment";
import Select from "@/components/element/Select.vue";
import Options from "@/components/element/Options.vue";

const $axios = inject("$axios");
const ref_item = [];
const setRef = (el) => {
  if (el) {
    ref_item.push(el);
  }
};
const setWidth = (w) => {
  return `width:${w}`;
};
const focusInput = (index) => {
  console.log(ref_item);
  ref_item[index].focus();
};
const search_item = ref({
  animal_kind: {
    icon: "paw",
    label: "類型",
    value: "",
    type: "select",
    width: "150px",
    options: [
      { label: "貓", value: "貓", icon: "cat" },
      { label: "狗", value: "狗", icon: "dog" },
    ],
  },
  animal_sex: {
    icon: "venus-mars",
    label: "性別",
    value: "",
    type: "select",
    width: "150px",
    options: [
      { label: "公", value: "M", icon: "cat" },
      { label: "母", value: "F", icon: "cat" },
      { label: "未知", value: "N", icon: "cat" },
    ],
  },
  animal_area_pkid: {
    icon: "location-dot",
    label: "動物所在地",
    value: "",
    type: "select",
    width: "250px",
    options: [
      { label: "公", value: "M", icon: "cat" },
      { label: "母", value: "F", icon: "cat" },
      { label: "未知", value: "N", icon: "cat" },
    ],
  },
});
</script>
