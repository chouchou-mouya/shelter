<template>
  <div class="analyze">
    <div class="date-picker">
      <el-date-picker
        v-model="date_range"
        type="monthrange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="YYYY-MM-DD"
        :disabled-date="disableDate"
        @change="changeDate"
      />
    </div>
    <Transition name="side-up" mode="out-in">
      <LoadingItem v-if="page_loading"></LoadingItem>
      <div v-else>
        <div class="bar-chart">
          <h1>每月縣市新增數量圖</h1>
          <LineChart
            v-if="line_chart_data.length !== 0"
            :raw_data="line_chart_data"
            :stack_key="Object.keys(area_key)"
          ></LineChart>
        </div>
        <div>
          <PieChart v-if="pie_chart_data.length !== 0" :raw_data="pie_chart_data"></PieChart>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.analyze {
  position: relative;
  z-index: 1;
  padding: 50px 30px;
  min-height: 100vh;
  .date-picker {
    position: relative;
    left: 50%;
    width: fit-content;
    transform: translateX(-50%);
    margin-bottom: 10px;
    div {
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    }
  }
  .bar-chart {
    h1 {
      font-weight: bold;
      font-size: 20px;
      // color: var(--primary-color);
    }
    width: 100%;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
  }
  .side-up-enter-active,
  .side-up-leave-active {
    transition: all 0.25s ease-out;
  }

  .side-up-enter-from {
    //item go entering
    opacity: 0;
    // transform: translateY(30px);
  }

  .side-up-leave-to {
    // item go leaving
    opacity: 0;
    // transform: translateY(-30px);
  }
}
</style>
<script>
import { computed, inject, onMounted, reactive, ref } from "vue";
import moment from "moment";
import LineChart from "@/components/LineChart.vue";
import { area, sex } from "@/utils/list.js";
import LoadingItem from "@/components/element/LoadingItem.vue";
import PieChart from "@/components/PieChart.vue";
export default {
  name: "analyze-item",
};
</script>
<script setup>
const $axios = inject("$axios");
const line_chart_data = ref([]);
const pie_chart_data = ref([]);
const page_loading = ref(false);
const area_key = computed(() => {
  return area
    .map((el) => el.label)
    .reduce((a, b) => {
      return { ...a, [b]: 0 };
    }, {});
});
const date_range = ref([
  moment(new Date()).subtract(3, "months").format("YYYY-MM-DD"),
  moment(new Date()).format("YYYY-MM-DD"),
]);
const disableDate = (date) => {
  if (moment(date).isAfter(moment(new Date()))) {
    return true;
  }
};
const setBarData = (ll, animal_createtime, animal_area_pkid) => {
  const { label: loacal } = area.filter((a) => a.value == animal_area_pkid)[0];
  const month = moment(animal_createtime).format("YYYY-MM");
  if (ll.some((e) => e["animal_createtime"] == month)) {
    //find
    const index = ll.findIndex((e) => e["animal_createtime"] == month);
    const the_obj = ll[index];
    the_obj["total"] = the_obj["total"] + 1;
    if (Object.keys(the_obj).includes(loacal)) {
      the_obj[loacal] = the_obj[loacal] + 1;
    } else {
      the_obj[loacal] = 1;
    }
  } else {
    const all_area_obj = JSON.parse(JSON.stringify(area_key.value));
    all_area_obj["animal_createtime"] = month;
    all_area_obj["total"] = 1;
    all_area_obj[loacal] = 1;
    ll.push(all_area_obj);
  }
  return ll;
};
const setCountData = (data, minimumDate) => {
  const chart_data = [];
  data.forEach((element) => {
    const { animal_area_pkid, animal_createtime } = element;
    if (
      moment(date_range.value[0]).isAfter(minimumDate) &&
      moment(animal_createtime).isBetween(
        date_range.value[0],
        date_range.value[1]
      )
    ) {
      const { label: loacal } = area.filter(
        (a) => a.value == animal_area_pkid
      )[0];
      const month = moment(animal_createtime).format("YYYY-MM");
      const index = chart_data.findIndex((d) => d.name == loacal);
      if (index != -1) {
        const inner_index = chart_data[index].data.findIndex(
          (v) => v.date == month
        );
        if (inner_index != -1) {
          chart_data[index].data[inner_index].value =
            chart_data[index].data[inner_index].value + 1;
        } else {
          chart_data[index].data.push({ date: month, value: 1 });
        }
      } else {
        //New Object
        const obj = {
          name: loacal,
          data: [{ date: month, value: 1 }],
        };
        chart_data.push(obj);
      }
    }
  });
  return chart_data;
};
const setPieType = (data, minimumDate) => {
  console.log(data, minimumDate);
  const chart_data = [];
  data.forEach((element) => {
    const {  animal_createtime, animal_sex } = element;
    if (
      moment(date_range.value[0]).isAfter(minimumDate) &&
      moment(animal_createtime).isBetween(
        date_range.value[0],
        date_range.value[1]
      )
    ) {
      const { label: the_sex } = sex.filter((a) => a.value == animal_sex)[0];
      const month = moment(animal_createtime).format("YYYY-MM");
      const index = chart_data.findIndex((d) => d.name == the_sex);
      if (index != -1) {
        const inner_index = chart_data[index].data.findIndex(
          (v) => v.date == month
        );
        if (inner_index != -1) {
          chart_data[index].data[inner_index].value =
            chart_data[index].data[inner_index].value + 1;
        } else {
          chart_data[index].data.push({ date: month, value: 1 });
        }
      } else {
        //New Object
        const obj = {
          name: the_sex,
          data: [{ date: month, value: 1 }],
        };
        chart_data.push(obj);
      }
    }
  });
  return chart_data;
};
const getData = async () => {
  page_loading.value = true;
  line_chart_data.value = [];
  try {
    let { data } = await $axios.basic.getAnimalData();
    data = data.sort(
      (a, b) =>
        new Date(a["animal_createtime"]) - new Date(b["animal_createtime"])
    );
    const dates = data.map((e) => new Date(e["animal_createtime"]));
    let minimumDate = new Date(Math.min.apply(null, dates));
    minimumDate = moment(minimumDate).format("YYYY-MM-DD");

    const line_data = setCountData(data, minimumDate);
    const pie_data = setPieType(data, minimumDate);
    line_chart_data.value = line_data;
    pie_chart_data.value = pie_data;
  } catch (error) {
    alert(error);
  }
  page_loading.value = false;
};
const changeDate = (date) => {
  if (date) {
    const last_date = moment(date[1], "YYYY-MM-DD")
      .endOf("month")
      .format("YYYY-MM-DD");
    date_range.value = [date[0], last_date];
    getData();
  }
};
onMounted(() => {
  getData();
});
</script>
