<template>
  <!-- {{ props.raw_data[0] }} -->
  <div ref="chart_box" id="chart-line">
    <div class=""></div>
  </div>
</template>

<style lang="scss">
#chart-bar {
  position: relative;
}
.bar {
  border-bottom: 2px solid #fff;
}
.tooltip {
  position: absolute;
}
</style>
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import "core-js/actual";
// import { useWindowSize } from "@vueuse/core";
import * as d3 from "d3";
// const { width } = useWindowSize();
const props = defineProps({
  raw_data: Array,
  stack_key: Array,
});
const init = reactive({
  width: 1000,
  height: 500,
  padding_top: 20,
  padding_bottom: 20,
  padding_right: 20,
  padding_left: 50,
});
const chart_data = ref([]);
const chart_box = ref(null);
const setChartData = () => {
  const newData = props.raw_data.map((d) => {
    let { data, name } = d;
    data = data.map((el) => ({
      label: d.name,
      animal_createtime: el.date,
      value: el.value,
    }));
    return {
      name,
      data,
    };
  });
  return newData;
};
const setAllDate = () => {
  const ll = chart_data.value.reduce((a, b) => {
    a = a.concat(b.data);
    return a;
  }, []);
  return ll.groupBy((item) => item.animal_createtime);
};
const max_y_data = (d) => {
  const data = Object.values(d).flat();
  return d3.max(data, (d) => d.value);
};
const draw = ({ dom }) => {
  //create svg
  const all_date = setAllDate();
  const svg = d3
    .select(dom)
    .append("svg")
    .attr("width", init.width)
    .attr("height", init.height)
    .append("g")
    .attr("transform", `translate(${init.padding_left},${init.padding_top})`);

  const view_heigh = init.height - init.padding_bottom - init.padding_top;
  const view_width = init.width - init.padding_right - init.padding_left;
  //set scale
  const x = d3
    .scaleBand()
    .range([0, view_width])
    .domain(Object.keys(all_date))
    .padding(0.4);
  const y = d3
    .scaleLinear()
    .range([view_heigh, 0])
    .domain([0, max_y_data(all_date)])
    .nice();
  const z = d3
    .scaleOrdinal()
    .range([
      d3.hsl(221, 0.96, 0.68),
      d3.hsl(207, 0.74, 0.6),
      d3.hsl(203, 0.72, 0.63),
      d3.hsl(196, 0.73, 0.64),
      d3.hsl(189, 0.48, 0.61),
      d3.hsl(188, 0.82, 0.56),
      d3.hsl(177, 0.48, 0.61),
      d3.hsl(159, 0.47, 0.56),
      d3.hsl(97, 0.51, 0.7),
      d3.hsl(68, 0.75, 0.68),
      d3.hsl(48, 0.94, 0.68),
      d3.hsl(36, 0.99, 0.65),
      d3.hsl(22, 0.84, 0.7),
      d3.hsl(10, 0.75, 0.69),
      d3.hsl(3, 0.75, 0.68),
      d3.hsl(0, 1, 0.74),
      d3.hsl(342, 0.59, 0.64),
      d3.hsl(322, 0.47, 0.6),
      d3.hsl(290, 0.38, 0.55),
      d3.hsl(247, 0.67, 0.72),
      d3.hsl(235, 0.59, 0.66),
      d3.hsl(232, 0.59, 0.62),
      d3.hsl(220, 0.52, 0.62),
    ]);
  //set color
  z.domain(props.stack_key);

  //set stack_method
  const line = d3
    .line()
    .x((d) => {
      return x(d["animal_createtime"]);
    })
    .y((d) => {
      return y(d["value"]);
    });

  const lines = svg.append("g").attr("class", "lines");
  const x_width = x.bandwidth();
  const lines_point_group = lines
    .selectAll(".line-group")
    .data(chart_data.value)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .attr("transform", `translate(${x_width / 2},0)`)
    .attr("stroke-width", 2);
  //line
  lines_point_group
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d["data"]))
    .style("stroke", (d) => z(d["name"]))
    .style("fill", "none");

  // point

  lines_point_group
    .selectAll("circle")
    .data((d) => d["data"])
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d["animal_createtime"]))
    .attr("cy", (d) => y(d["value"]))
    .attr("r", 5)
    .style("stroke", (d) => z(d["label"]))
    .style("fill", (d) => z(d["label"]))
    .on("mouseover", function (_, the_item) {
      const { value, label, animal_createtime } = the_item;
      let default_left = x(animal_createtime)+(x_width);
      let default_top = y(value);
      d3.select(dom)
        .append("div")
        .attr("class", "tooltip")
        .style("left", `${default_left}px`)
        .style("top", `${default_top}px`)
        .html(
          `
          <p>${label}</p>
          <p>${value}</p>
        `
        )
        .classed("appear", true)
        .classed("disappear", false);
      console.log(value, label, animal_createtime);
    })
    .on("mouseout", function () {
      d3.select(dom).selectAll(".tooltip").remove();
    });
  //set Axis
  //xAxis
  svg
    .append("g")
    .attr("transform", `translate(0,${view_heigh})`)
    .call(d3.axisBottom(x));
  //yAxis
  svg.append("g").attr("transform", `translate(0,0)`).call(d3.axisLeft(y));
};

onMounted(() => {
  init.width = chart_box.value.clientWidth;
  console.log(chart_box.value.clientHeight)
  chart_data.value = setChartData();
  draw({ dom: "#chart-line" });
});
</script>
