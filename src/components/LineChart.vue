<template>
  <!-- {{ props.raw_data[0] }} -->
  <div ref="chart_box">
    <!-- <div class="chart_top">
      <div>全選</div>
      <div>全不選</div>
    </div> -->
    <div id="chart-line">
      <div class="chart"></div>
      <div ref="legends_box" class="legends"></div>
    </div>
  </div>
</template>

<style lang="scss">
.chart_top {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
}
#chart-line {
  position: relative;
  display: flex;
  .legends {
    width: 120px;
    text-align: right;
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
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import "core-js/actual";
// import { useWindowSize } from "@vueuse/core";
import * as d3 from "d3";
import { transition } from "d3-transition";
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
const legends_box = ref(null);
const disable_legend = ref([]);
const setChartData = (data) => {
  const newData = data.map((d) => {
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

const getTransition = () => {
  return transition().duration(1000);
};
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
  //data lines
  svg.append("g").attr("class", "lines");
  //xAxis
  svg.append("g").attr("class", "Xaxis");
  //yAxis
  svg.append("g").attr("class", "Yaxis");
  // console.log(svg, d3.select(dom).select(".chart").select("g"));
  return svg;
};

const getSVGWidth = computed(() => {
  const legend_box_width = legends_box.value.clientWidth;
  const svg_width = init.width - legend_box_width;
  return { svg_width, legend_box_width };
});

const draw = ({ dom, svg }) => {
  //first get legend
  const { svg_width, legend_box_width } = getSVGWidth.value;
  legend(dom, legend_box_width, svg);
  //create svg
  const all_date = setAllDate();

  const view_heigh = init.height - init.padding_bottom - init.padding_top;
  const view_width = svg_width - init.padding_right - init.padding_left;
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

  // //set color
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

  const lines = svg.selectAll(".lines");
  const x_width = x.bandwidth();

  const lines_point_group = lines
    .selectAll(".line-group")
    .data(chart_data.value)
    .join("g")
    .attr("class", "line-group")
    .attr("name", (d) => d["name"])
    .attr("transform", `translate(${x_width / 2},0)`);

  //line
  lines_point_group
    .selectAll("path")
    .data((d) => [d])
    .join("path")
    .transition(getTransition())
    .attr("class", "line")
    .attr("d", (d) => line(d["data"]))
    .style("stroke", (d) => z(d["name"]))
    .style("fill", "none")
    .attr("stroke-width", 2);

  // point
  lines_point_group
    .selectAll("circle")
    .data((d) => d["data"])
    .join("circle")
    .transition(getTransition())
    .attr("cx", (d) => x(d["animal_createtime"]))
    .attr("cy", (d) => y(d["value"]))
    .attr("r", 5)
    .style("stroke", () => "#fff")
    .style("fill", (d) => z(d["label"]));

  // set tool
  svg
    .append("line")
    .attr("class", "index")
    .attr("transform", `translate(${x_width / 2},0)`)
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("stroke-dasharray", ("3, 3"))

  svg.append("g").attr("class", "point_g");

  const show_point = svg
    .selectAll(".point_g")
    .attr("transform", `translate(${x_width / 2},0)`)
    .style("stroke", () => "#fff");

  //set Axis

  //xAxis
  svg
    .selectAll(".Xaxis")
    .attr("transform", `translate(0,${view_heigh})`)
    .transition()
    .duration(2000)
    .call(d3.axisBottom(x));

  //yAxis
  svg
    .selectAll(".Yaxis")
    .attr("transform", `translate(0,0)`)
    .transition(getTransition())
    .call(d3.axisLeft(y));

  const outter_svg = d3.select(dom).select(".chart").select("svg");

  outter_svg
    .on("mousemove", function (mouse) {
      var eachBand = x.step();
      // - (init.padding_left + init.padding_right)
      const x_cord =
        d3.pointer(mouse)[0] - (init.padding_left + init.padding_right);
      // const x = d3.pointer(mouse)[0] - init.padding_left;
      // const [x_cord,y_cord] = d3.pointer(mouse);
      // find closest data point
      const index = Math.round(x_cord / eachBand);
      const val = x.domain()[index];
      if (val) {
        svg
          .select(".index")
          .style("visibility", "visible")
          .attr("x1", x(val))
          .attr("y1", 0)
          .attr("x2", x(val))
          .attr("y2", view_heigh);

        show_point.style("visibility", "hidden");
        show_point
          .selectAll("circle")
          .data(all_date[val])
          .join("circle")
          .attr("cx", (d) => {
            return x(d.animal_createtime);
          })
          .attr("cy", (d) => {
            return y(d.value);
          })
          .attr("r", 6)
          .attr("stroke-width", 2)
          .style("fill", (d) => z(d["label"]))
          .style("visibility", "visible");
        show_point.exit().remove();
      }
    })
    .on("mouseout", function () {
      show_point.selectAll("circle").style("visibility", "hidden");
      svg.select(".index").style("visibility", "hidden");
    });
  lines_point_group.exit().remove();
};
const setDisableColor = (d, type) => {
  if (disable_legend.value.includes(d)) {
    return "#ccc";
  } else {
    return type == "circle" ? z(d) : "";
  }
};
const legend = (dom, width, svg) => {
  z.domain(props.stack_key);
  const legend_data = props.raw_data.map((el) => el.name);
  const r = 6;
  const y_margin = 22;
  const x_padding = 15;
  d3.select(dom).select(".legends").select("svg").remove();
  const legend_box = d3
    .select(dom)
    .select(".legends")
    .append("svg")
    .attr("width", width)
    .attr("height", init.height)
    .attr("transform", `translate(10,0)`);

  legend_box
    .selectAll("g.legend")
    .data(legend_data)
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
    .on("mouseover", function (_, the_item) {
      // this.style.fill = z(the_item);
      setDisableColor(the_item, "text");
      d3.selectAll(`.line-group[name='${the_item}']`)
        .select("path")
        .attr("stroke-width", 4);
    })
    .on("mouseout", function (_, the_item) {
      // this.style.fill = "";
      setDisableColor(the_item, "text");
      d3.selectAll(`.line-group[name='${the_item}']`)
        .select("path")
        .attr("stroke-width", 2);
    })
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
      chart_data.value = setChartData(new_data);
      draw({ dom: "#chart-line", svg: svg });
    });
};
onMounted(() => {
  init.width = chart_box.value.clientWidth;
  chart_data.value = setChartData(props.raw_data);
  const svg = initSvg({ dom: "#chart-line" });
  draw({ dom: "#chart-line", svg: svg });
});
</script>
