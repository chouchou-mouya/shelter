<template>
  <div class="case-item">
    <div>
      <div class="case-img">
        <!-- :style="setPhoto" -->
        <ProgressiveImage
          v-if="props.data.album_file"
          :src="props.data.album_file"
        />
        <div class="no-photo" v-else>
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
      <div class="detail">
        <p>
          {{ setDate }}
        </p>
        <p>
          {{ props.data["shelter_name"] }}
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
      <!-- {{ props.data }} -->
    </div>
  </div>
</template>

<style lang="scss">
.case-item {
  position: relative;
  top: 0px;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  .case-img {
    overflow: hidden;
    transition: 0.3s;
    filter: saturate(90%);
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    img {
      display: block;
    }
    .no-photo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      color: var(--strong-color);
      text-align: center;
    }
    svg {
      font-size: 50px;
    }
    p {
      margin-top: 5px;
      font-size: 13px;
    }
  }
  .case-info {
    padding: 10px 20px;
    h1 {
      font-size: 16px;
      font-weight: bold;
    }
    > p {
      font-size: 13px;
      color: $dark;
      margin: 10px 0;
      line-height: 1.3em;
      word-wrap: break-word;
    }
    .detail {
      margin-bottom: 5px;
      display: flex;
      justify-content: flex-end;
      > p {
        font-size: 12px;
        color: $gray-dark;
        margin: 0 5px;
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
  &:hover {
    transition: 0.3s;
    top: -5px;
    @include shadow(5px, 20px, 15px, -10px);
    .case-img {
      transition: -webkit-filter 500ms linear;
      filter: saturate(100%);
    }
    .hover-block {
      transition: 0.3s;
      top: 0;
    }
  }
}
</style>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { Animal } from "@/utils/getAnimalDetail.js";
import { ProgressiveImage } from "vue-progressive-image";

const the_animal = reactive(new Animal(props.data));
const props = defineProps({ data: Object });
const setSex = computed(() => {
  return the_animal.setSex();
});
const setName = computed(() => {
  return the_animal.setName();
});

const setDate = computed(() => {
  if (props.data["animal_update"]) {
    return props.data["animal_update"];
  } else {
    return props.data["animal_createtime"];
  }
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

onMounted(() => {
  // console.log(myobject)
});
</script>
