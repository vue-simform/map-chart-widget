<template>
  <div>
    <apexchart width="600" type="line" :options="chartOptions" :series="filteredSeries"></apexchart>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ApexChart from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Sales',
    data: [
      { x: '2024-01-01', y: 30 },
      { x: '2024-02-01', y: 40 },
      { x: '2024-03-01', y: 45 },
      { x: '2024-04-01', y: 50 },
      { x: '2024-05-01', y: 49 },
      { x: '2024-06-01', y: 60 },
      { x: '2024-07-01', y: 70 },
      { x: '2024-08-01', y: 91 },
      { x: '2024-09-01', y: 125 }
    ]
  }
])

const selectedRange = ref({
  min: new Date('2024-01-01').getTime(),
  max: new Date('2024-09-01').getTime()
})

const chartOptions = ref({
  chart: {
    id: 'main-chart',
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: true
    },
    selection: {
      enabled: true,
      type: 'x',
      fill: {
        color: '#24292e',
        opacity: 0.1
      },
      xaxis: {
        min: selectedRange.value.min,
        max: selectedRange.value.max
      }
    },
    events: {
      selection: (chartContext, { xaxis }) => {
        selectedRange.value = xaxis
      }
    }
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2024-01-01',
      '2024-02-01',
      '2024-03-01',
      '2024-04-01',
      '2024-05-01',
      '2024-06-01',
      '2024-07-01',
      '2024-08-01',
      '2024-09-01'
    ]
  },
  title: {
    text: 'Monthly Sales Data'
  }
})

const filteredSeries = computed(() => {
  return series.value.map((serie) => ({
    ...serie,
    data: serie.data.filter(
      (point) =>
        new Date(point.x).getTime() >= selectedRange.value.min &&
        new Date(point.x).getTime() <= selectedRange.value.max
    )
  }))
})

watch(selectedRange, (newRange) => {
  chartOptions.value.xaxis.min = newRange.min
  chartOptions.value.xaxis.max = newRange.max
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
