<template>
  <div class="case">
    <div class="case-photo">
      <img v-if="props.data.album_file" :src="props.data.album_file" />
      <div class="no-photo" v-else>
        <div>
          <font-awesome-icon icon="paw" />
          <p>No Photo</p>
        </div>
      </div>
    </div>
    <div class="case-info">
      <h1 class="case-info__name">
        {{ setName }}
      </h1>
      <p>
        {{
          props.data["animal_remark"]
            ? props.data["animal_remark"]
            : "No Remark"
        }}
      </p>
      <div class="case-info__date">
        建立時間 {{ props.data["animal_createtime"] }}  更新時間 {{ props.data["animal_update"] }}
      </div>
      <div class="detail">
        <p>
          {{ props.data["shelter_name"] }}
        </p>
        <p>
          {{ props.data["shelter_address"] }}
        </p>
        <p>
          {{ props.data["shelter_tel"] }}
        </p>
      </div>
      <div
        class="tab-list"
        :style="setTabColor(tab.color)"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        {{ tab.function }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.case {
  height: 500px;
  @include overflow(auto, auto);
  .case-photo {
    max-width: 100%;
    .no-photo {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      width: 100%;
      height: 100px;
      border: 1px solid #ccc;
      //   transform: translateY(-50%);
      //   transform: translateX(-50%);
      color: var(--strong-color);
      > div {
        text-align: center;
        p {
          margin: 5px 0;
        }
      }
    }
  }
  .case-info {
    padding: 10px 20px;
    h1 {
      font-size: 16px;
      font-weight: bold;
    }
    &__date{
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        color: $dark;
        
    }
    > p {
      font-size: 13px;
      color: $dark;
      margin: 10px 0;
      line-height: 1.3em;
      word-wrap: break-word;
    }
    .detail {
      margin: 5px 0;
      background: #eee;
      padding: 10px;
      border-radius: 5px;
      > p {
        color: $dark;
        font-size: 12px;
        margin: 5px 5px;
      }
    }

    .tab-list {
      display: inline-block;
      margin-right: 5px;
      margin-top: 5px;
      font-size: 12px;
      padding: 5px;
      letter-spacing: 3px;
      background: #ccc;
      width: fit-content;
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>
<script>
import { Animal } from "@/utils/getAnimalDetail.js";
import { computed, reactive, ref } from "vue";
export default {
  name: "case",
};
</script>

<script setup>
const props = defineProps({
  data: Object,
});
const the_animal = reactive(new Animal(props.data));
const setSex = computed(() => {
  return the_animal.setSex();
});
const setName = computed(() => {
  return the_animal.setName();
});

const setAge = computed(() => {
  return the_animal.setAge();
});

const tabs = ref([
  {
    function: setSex,
    color: "#98cfd3",
  },
  {
    function: setAge,
    color: "#ccb9ef",
  },
  {
    function: computed(() => props.data["animal_colour"]),
    color: "#edd571",
  },
]);
const setTabColor = (bg) => {
  return `background:${bg}`;
};

</script>
