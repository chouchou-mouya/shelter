<template>
  <div>
    <div class="landing_top">
      <div class="landing_top__content">
        <h1>Find <span>Family</span> for You!</h1>
        <p>
          全台收容所有超過一萬個毛小孩正在等待他們的新家人，期待你也能在這裡找到最佳夥伴！
        </p>
        <div class="search_bar">
          <input type="text" placeholder="嘗試輸入特徵，例如:貓" />
          <font-awesome-icon icon="magnifying-glass" />
        </div>
        <div class="new_case">
          <div class="case" v-for="(the_case, index) in new_case" :key="index">
            <Case :item="the_case"></Case>
          </div>
        </div>
      </div>
      <div class="landing_top__img">
        <img src="../assets/images/milk-tea-h7Dw2hF4e0A-unsplash.jpeg" />
      </div>
    </div>
    <div class="landing_center"></div>
    <!-- <div>123</div> -->
    <!-- <img src="../assets/images/milk-tea-h7Dw2hF4e0A-unsplash.jpeg"/> -->
  </div>
</template>

<style lang="scss">
.landing_top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* background-image: url(../assets/images/milk-tea-h7Dw2hF4e0A-unsplash.jpeg);
  background-repeat: no-repeat;*/
  /* width: 100%; */
  /* background-position: right;
  background-size: contain; */

  &__img {
    flex: 5;
    display: flex;
    justify-content: flex-end;
    img {
      height: 100vh;
    }
  }
  &__content {
    padding-top: 200px;
    flex: 5;
    text-align: center;
    h1 {
      letter-spacing: 1px;
      font-family: "Nunito", sans-serif;
      font-size: 45px;
      span {
        color: var(--primary_color);
      }
    }
    p {
      padding-top: 15px;
      width: 330px;
      word-spacing: 5px;
      margin: 0 auto;
      line-height: 20px;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .search_bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid #999;
      border-radius: 50px;
      padding: 10px 20px;
      margin: 20px 0px;
      max-width: 200px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      &:focus-within {
        border: 1px solid #999;
      }
      svg {
        cursor: pointer;
        &:hover {
          color: var(--primary_color);
          @include ani(zoom);
        }
        &:active {
          @include ani(zoom);
        }
      }
      input {
        outline: none;
        width: 100%;
        border: none;
        background: transparent;
      }
    }
    .new_case {
      padding-top:50px;
      width: 300px;
      overflow: auto;
      display: flex;
    }
  }
}
</style>
<script setup>
import { ref } from "@vue/reactivity";
import Case from "@/components/CaseItem.vue";
import { inject } from "@vue/runtime-core";
import moment from "moment";

const $axios = inject("$axios");
const new_case = ref([]);

const getNewData = async () => {
  console.log(moment().format("YYYY-MM-DD"));
  await $axios.basic
    .getAnimalData({
      top: 10,
      animal_kind: "貓",
      // animal_update:moment().format('YYYY/MM/DD')
    })
    .then(({ data }) => {
      new_case.value = data.Data.filter((_, index) => {
        return index < 5;
      });
      console.log(data.Data);
    });
};
getNewData();
</script>
