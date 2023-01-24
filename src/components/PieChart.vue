<template>
  <Div class="pie-chart">
    
    
</Div>
</template>

<style lang="scss">
.pie-chart {

}
</style>
<script>
import { onMounted } from 'vue-demi';
export default {
  name: "Pie-chart",
};
</script>

<script setup>
const props=defineProps({
  raw_data:Array,
})
onMounted(()=>{
  console.log(props.raw_data)
})

</script>
