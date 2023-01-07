<template>
  <div class="case-item">
    <div class="outer-photo" :style="photo" v-if="props.data.album_file"></div>
    <div class="outer-photo" v-else>
      <font-awesome-icon icon="paw" />
    </div>
    <div class="case-info">
      <div class="info-item" v-for="info in infos" :key="info.value">
        <p>{{info.label}}</p>{{ props.data[info.value] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.case-item {
  border: 1px solid #ccc;
  border-radius: 20px;
  max-width: 200px;
  position: relative;
  padding: 20px;
  background: #fff;
  font-size: 14px;
  letter-spacing: 1px;
  @include shadow(5px,5px,10px,-5px);
  .outer-photo {
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    background-position: center;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    overflow: hidden;
    -webkit-filter:saturate(0.5);
    &:hover{
      -webkit-filter:saturate(1);
    }
    > svg {
      background: #fff;
      font-size: 60px;
      border-radius: 50%;
      padding: 20px;
    }
  }
  .case-info {
    margin-top: 50px;
    text-align: left;
    .info-item{
      p{
        color: #999;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

<script setup>
import { computed } from "vue";

const props = defineProps({ data: Object });

const infos = [
  { label: "動物的類型", value: "animal_kind" },
  { label: "動物性別", value: "animal_sex" },
  { label: "動物體型", value: "animal_bodytype" },
  { label: "動物年紀", value: "animal_age" },
  { label: "動物的實際所在地", value: "animal_place" },
];

const photo = computed(() => {
  return `background-image:url(${props.data.album_file})`;
});
</script>