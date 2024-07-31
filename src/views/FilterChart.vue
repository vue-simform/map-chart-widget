<template>
  <div style="padding-top: 5%">
    <div class="chart-container">
      <div>
        <h1>Select a range form bottom Chart</h1>
        <BrushChart />
        <hr />
      </div>
      <div>
        <h1>Select a Area</h1>
        <FilterAreaChart />
        <hr />
      </div>
      <div>
        <h1>Select a Range for Filtering chart</h1>
        <FilterRangeChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import ApexChart from 'vue3-apexcharts'
import FilterAreaChart from './FilterAreaChart.vue'
import BrushChart from './BrushChart.vue'
import FilterRangeChart from './FilterRangeChart.vue'
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1% 4%;
}

.chart-title {
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 20px;
}
</style>
