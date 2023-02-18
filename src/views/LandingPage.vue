<template>
  <div class="landing">
    <Popup v-model="popup_status">
      <Case :data="detail_item"></Case>
    </Popup>
    <div class="landing-top">
      <div class="landing-top-contain">
        <div class="slogan">
          <h1>Find <span>Family</span> for You!</h1>
          <p>
            全台收容所有 10000+ 毛小孩正在等待他們的新家人<br />
            希望你能在這裡找到最佳夥伴
          </p>
        </div>
        <div class="search-box">
          <div
            class="search-item"
            :style="setWidth(item.width)"
            v-for="(item, key) in search_item"
            :key="key"
          >
            <font-awesome-icon :icon="item.icon" />
            <template v-if="item.type == 'select'">
              <el-select
                clearable
                v-model="item.value"
                :placeholder="item.label"
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
              <input type="text" :placeholder="item.label" />
            </template>
          </div>
        </div>
        <div class="search-btn">
          <button
            @click="!btn_loading && launch()"
            :class="btn_loading ? 'btn-loading' : false"
          >
            <template v-if="btn_loading"> Loading... </template>
            <template v-else>Search Now !</template>
          </button>
        </div>
      </div>
      <div class="bg"></div>
    </div>
    <div ref="landing_search_box">
      <div
        v-if="view_data.length !== 0"
        class="glo-contain landing-contain-box"
      >
        <CaseItem
          v-for="(res, index) in view_data"
          :key="index"
          :data="res"
          @click="openDetail(res)"
        >
        </CaseItem>
      </div>
      <div ref="case_end">
        <div class="case-end" v-if="view_data.length !== 0">
          <div class="case-end__loading" v-if="is_view">
            <LoadingItem></LoadingItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.landing {
  position: relative;
  z-index: 1;
  &-top {
    width: 100%;
    background: #fff;
    position: relative;
    z-index: 1;
    height: 100vh;
    padding: 8% 3%;
    .bg {
      z-index: -1;
      position: absolute;
      top: 0;
      top: 8%;
      width: 94%;
      box-sizing: border-box;
      border-radius: 30px;
      height: calc(100vh - 16%);
      background-image: url(../assets/images/bg3.png);
      background-repeat: no-repeat;
      background-position: center center;
      // background: url(../assets/images/bg3.png) no-repeat center center;
      @include phone() {
        background-position: 80% 75%;
      }
    }
  }
  &-top-contain {
    border-radius: 20px;
    width: fit-content;
    position: relative;
    padding-top: 10%;
    left: 8%;
    // transform: translateX(-50%);
    .search-box {
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
      @include phone() {
        display: grid;
        width: 100%;
        svg {
          width: 25px;
        }
      }
      .search-item {
        display: flex;
        align-items: center;
        margin: 0 5px;
        padding: 0 10px;
        & + .search-item {
          border-left: 1px solid #e1e1e1;
          @include phone() {
            border-left: none;
          }
        }
        &:focus-within {
          svg {
            color: var(--strong-color);
          }
        }
        @include phone() {
          svg {
            width: 25px;
          }
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
        @include phone() {
          width: 100%;
        }
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
    @include mini() {
      width: 80%;
      padding-top: 30%;
    }
  }
  &-contain {
    background: #f2f2f2;
  }
  .slogan {
    padding-top: 10px;
    text-align: center;
    letter-spacing: 1px;

    h1 {
      // text-shadow: 0.01em 0.15em 0.18em rgba(0,0,0,0.3);
      font-family: "Nunito", sans-serif;
      font-size: 40px;
      @include phone() {
        font-size: 35px;
      }
      span {
        text-decoration: wavy underline;
        text-underline-offset: 10px;
        text-decoration-thickness: 3px;
        color: var(--strong-color);
        @include mini() {
          text-underline-offset: 5px;
        }
      }
    }
    p {
      margin-top: 25px;
      font-size: 13px;
      line-height: 20px;
      @include mini() {
        background: rgba(255,255,255,0.5);
        border-radius: 10px;
    }
    }
  }
  .search-btn {
    button {
      padding: 15px;
      font-size: 20px;
      border-radius: 20px;
      color: #fff;
      background: var(--primary-color);
      font-family: "Nunito", sans-serif;
      @include shadow(10px, 10px, 20px, -5px);
      &.btn-loading {
        background: #ccc;
      }
      &:hover {
        transition: 0.1s;
        font-size: 22px;
        background: var(--primary-color-darken);
      }
      &:active {
        background: var(--primary-color-darkenest);
      }
    }
  }
  &-contain-box {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    /* grid-template-rows:1fr auto; */
    justify-content: center;
    grid-gap: 20px 10px;
    width: 100%;
    // margin-top: 20px;
    @include overflow(auto);
    min-height: 300px;
    padding: 80px 30px;
    /* .more-btn{
      grid-column-start:1;
      grid-column-end:5;
    } */
  }
  // .bg {
  //   /* background: url(../assets/images/pexels-vlad-bagacian-1634838.jpeg) no-repeat center ; */
  //   width: 100%;
  //   background-size: cover;
  //   height: 100vh;
  //   position: absolute;
  //   top: 0px;
  //   z-index: -1;
  // }
  .case-end {
    padding-bottom: 50px;
    &__loading {
      // position: relative;
      // left: 50%;
    }
  }
}
</style>
<script setup>
import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import { srollTo } from "@/utils/utils.js";
import { area } from "@/utils/list.js";
import CaseItem from "@/components/CaseItem.vue";
import LoadingItem from "@/components/element/LoadingItem.vue";
import Popup from "@/components/element/Popup.vue";
import Case from "@/components/Case.vue";
const { width } = useWindowSize();
// import { inject } from "vue";
// import moment from "moment";

const $axios = inject("$axios");
const case_end = ref(null);
const popup_status = ref(false);
const landing_search_box = ref(null);
const init_data = {
  count: 8 * 3,
};
const btn_loading = ref(false);
const count = ref(init_data["count"]);
const setWidth = (w) => {
  return `width:${w}`;
};
const view_data = ref([]);
let observer;

const search_item = ref({
  animal_kind: {
    icon: "paw",
    label: "類型",
    value: "",
    type: "select",
    width: width.value > 580 ? "150px" : "100%",
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
    width: width.value > 580 ? "150px" : "100%",
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
    width: width.value > 580 ? "250px" : "100%",
    options: area,
  },
});
const setSearchValue = ({ obj }) => {
  const res = {};
  for (let key in obj) {
    res[key] = obj[key].value;
  }
  return res;
};
const is_view = ref(false);
const detail_item = ref(null);
const launch = async () => {
  //init
  btn_loading.value = true;
  count.value = init_data["count"];
  view_data.value = [];
  await getData({ top: count.value });
  setLazyLoading();
  srollTo({ targetDom: landing_search_box.value });
  var top = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;
  console.log(top, left);
  btn_loading.value = false;
};

const getData = async ({ top }) => {
  const search_value = setSearchValue({ obj: search_item.value });
  search_value["$top"] = top;
  try {
    const { data } = await $axios.basic.getAnimalData(search_value);
    //農委會的api一次只能load 1000筆
    view_data.value = data;
  } catch (error) {
    alert(error);
  }
};

const callback = (entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      //判斷目標元素是否進到可視範圍
      if (view_data.value.length == count.value) {
        //還有資料Load more
        is_view.value = entry.isIntersecting;
        count.value = count.value + 16;
        getData({ top: count.value });
      } else {
        observer.unobserve(case_end.value);
        is_view.value = false;
      }
    }
  }
};
const setLazyLoading = () => {
  observer = new IntersectionObserver(callback, {
    threshold: 0,
  });
  observer.observe(case_end.value);
};
const openDetail = (the_item) => {
  console.log(the_item);
  popup_status.value = true;
  detail_item.value = the_item;
};
watch(popup_status, (v) => {
  if (v == false) {
    detail_item.value = null;
  }
});

watch(width, (v) => {
  if (v <= 580) {
    //change for moblie
    for (let key in search_item.value) {
      search_item.value[key]["width"] = "100%";
    }
  } else {
    //normal
    for (let key in search_item.value) {
      if (key == "animal_area_pkid") {
        search_item.value[key]["width"] = "250px";
      } else {
        search_item.value[key]["width"] = "150px";
      }
    }
  }
});

onMounted(() => {});
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
