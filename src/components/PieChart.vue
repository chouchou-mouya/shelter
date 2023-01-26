<template>
  <div ref="chart_box">
    <div :id="setID" class="chart-pie">
      <div class="chart"></div>
      <div ref="legends_box" class="legends"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-pie {
  position: relative;
  // display: flex;
  .chart {
  }
  .legends {
    .legend {
      cursor: pointer;
      font-size: 13px;
      p {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
<script>
export default {
  name: "Pie-chart",
};
</script>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import "core-js/actual";
import * as d3 from "d3";
import { transition } from "d3-transition";
const props = defineProps({
  raw_data: Array,
  stack_key: Array,
});

const init = reactive({
  width: 300,
  height: 400,
  padding_top: 20,
  padding_bottom: 20,
  padding_right: 20,
  padding_left: 50,
});
const chart_box = ref(null);
const legends_box = ref(null);
const disable_legend = ref([]);
const chart_data = ref([]);
const z = d3.scaleOrdinal().range([
  d3.hsl(221, 0.96, 0.68),
  // d3.hsl(207, 0.74, 0.6),
  // d3.hsl(203, 0.72, 0.63),
  // d3.hsl(196, 0.73, 0.64),
  // d3.hsl(189, 0.48, 0.61),
  // d3.hsl(188, 0.82, 0.56),
  // d3.hsl(177, 0.48, 0.61),
  // d3.hsl(159, 0.47, 0.56),
  // d3.hsl(97, 0.51, 0.7),
  d3.hsl(68, 0.75, 0.68),
  // d3.hsl(48, 0.94, 0.68),
  // d3.hsl(36, 0.99, 0.65),
  // d3.hsl(22, 0.84, 0.7),
  // d3.hsl(10, 0.75, 0.69),
  // d3.hsl(3, 0.75, 0.68),
  d3.hsl(0, 1, 0.74),
  // d3.hsl(342, 0.59, 0.64),
  // d3.hsl(322, 0.47, 0.6),
  // d3.hsl(290, 0.38, 0.55),
  d3.hsl(247, 0.67, 0.72),
  d3.hsl(235, 0.59, 0.66),
  d3.hsl(232, 0.59, 0.62),
  d3.hsl(220, 0.52, 0.62),
]);
// set color
z.domain(props.stack_key);

const initSvg = ({ dom }) => {
  const { svg_width } = getSVGWidth.value;
  const svg = d3
    .select(dom)
    .select(".chart")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", init.height)
    .append("g")
    .attr("transform", `translate(${init.padding_left},${init.padding_top})`);
  //data pie
  svg.append("g").attr("class", "pie_group");
  return svg;
};

const getSVGWidth = computed(() => {
  const legend_box_width = legends_box.value.clientWidth;
  const svg_width = init.width;
  return { svg_width, legend_box_width };
});

const draw = ({ dom, svg }) => {
  //first get legend
  const { svg_width, legend_box_width } = getSVGWidth.value;
  legend(dom, svg_width, svg);
  const view_heigh = init.height - init.padding_bottom - init.padding_top;
  const view_width = svg_width - init.padding_right - init.padding_left;
  const pieData = d3.pie().value((d) => d.data)(chart_data.value);
  console.log(pieData);
  const arc = d3.arc().innerRadius(30).outerRadius(100);
  const arcGroup = svg
    .select(".pie_group")
    .attr("transform", `translate(${view_width / 2}, ${view_heigh / 2})`);

  arcGroup
    .selectAll("path")
    .data(pieData)
    .join("path")
    .on("mousemove", function (_, the_item) {
      const name = the_item.data.name;
      console.log(name);
      d3.selectAll(`.pie[name='${name}']`).style("fill", "#000");
    })
    .on("mouseout", function (_, the_item) {
      const name = the_item.data.name;
      d3.selectAll(`.pie[name='${name}']`).style("fill", z(name));
    })
    .attr("name", (d) => d.data["name"])
    .attr("class", "pie")
    .attr("fill", (d) => {
      console.log(d.data.name);
      return z(d.data.name);
    })
    .attr("d", arc);
  arcGroup.exit().remove();
  // arcGroup.exit().remove();
};
const setDisableColor = (d, type) => {
  if (disable_legend.value.includes(d)) {
    return "#ccc";
  } else {
    return type == "circle" ? z(d) : "";
  }
};
const setID = computed(() => {
  const random = Math.random().toString(16).slice(2);
  const the_item = new Date().getTime();
  return `pie-chart_${the_item}_${random}`;
});

const legend = (dom, width, svg) => {
  const r = 6;
  const h = props.stack_key.length * 30;
  const y_margin = 22;
  const x_padding = 15;
  d3.select(dom).select(".legends").select("svg").remove();
  const legend_box = d3
    .select(dom)
    .select(".legends")
    .append("svg")
    .attr("width", width)
    .attr("height", h)
    .attr("transform", `translate(10,0)`);

  legend_box
    .selectAll("g.legend")
    .data(props.stack_key)
    .enter()
    .append("g")
    .attr("class", "legend");

  legend_box
    .selectAll("g")
    .append("circle")
    .attr("cx", () => r)
    .attr("cy", (_, i) => i * y_margin)
    .attr("r", r)
    .style("fill", (d) => setDisableColor(d, "circle"))
    .attr("transform", `translate(0,${init.padding_top})`);

  legend_box
    .selectAll("g")
    .append("text")
    .attr("x", r * 2 + x_padding)
    .attr("y", (_, i) => i * y_margin)
    .text((d) => d)
    .style("fill", (d) => setDisableColor(d, "text"))
    .attr("transform", `translate(0,${init.padding_top + 4})`)
    .on("click", function (_, the_item) {
      let new_data = [];
      if (disable_legend.value.includes(the_item)) {
        // open the legend
        const index = disable_legend.value.indexOf(the_item);
        disable_legend.value.splice(index, 1);
        new_data = props.raw_data.filter(
          (el) => !disable_legend.value.includes(el.name)
        );
      } else {
        //colse
        disable_legend.value.push(the_item);
        new_data = props.raw_data.filter(
          (el) => !disable_legend.value.includes(el.name)
        );
      }
      chart_data.value = new_data;
      console.log(chart_data.value);
      draw({ dom: `#${setID.value}`, svg: svg });
    });
};
onMounted(() => {
  init.width =
    chart_box.value.clientWidth == 0 ? init.width : chart_box.value.clientWidth;
  chart_data.value = props.raw_data;
  const svg = initSvg({ dom: `#${setID.value}` });
  draw({ dom: `#${setID.value}`, svg: svg });
});
</script>
