<template>
  <div id="wrapper">
    <div id="chart-line2">
      <apexchart
        ref="mainChartRef"
        type="line"
        height="230"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div id="chart-line">
      <apexchart
        ref="brushChartRef"
        type="area"
        height="130"
        :options="chartOptionsLine"
        :series="seriesLine"
        @selection="handleSelection"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Mock data generation function
function generateDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0
  const series = []
  while (i < count) {
    const x = baseval
    const y = Math.floor((Math.random() * (yrange.max - yrange.min + 1) * i) / count) + yrange.min

    series.push([x, y])
    baseval += 86400000 // Increment by one day in ms
    i++
  }
  return series
}

const data1 = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
  min: 20,
  max: 100
})
const data2 = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
  min: 5,
  max: 50
})

const series = ref([
  { name: 'Flies', data: data1 },
  { name: 'Spiders', data: data2 }
])

const seriesLine = ref([
  { name: 'Flies', data: data1 },
  { name: 'Spiders', data: data2 }
])

const chartOptions = ref({
  chart: {
    id: 'chart2',
    type: 'line',
    height: 230,
    toolbar: {
      autoSelected: 'pan',
      show: false
    }
  },
  colors: ['#008FFB', '#00E396'],
  stroke: {
    width: [2, 6],
    curve: ['straight', 'monotoneCubic']
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: [1, 0.75]
  },
  markers: {
    size: 0
  },
  yaxis: [
    {
      seriesName: 'Flies',
      axisTicks: {
        show: true,
        color: '#008FFB'
      },
      axisBorder: {
        show: true,
        color: '#008FFB'
      },
      labels: {
        style: {
          colors: '#008FFB'
        }
      },
      title: {
        text: 'Flies',
        style: {
          color: '#008FFB'
        }
      }
    },
    {
      seriesName: 'Spiders',
      opposite: true,
      axisTicks: {
        show: true,
        color: '#00E396'
      },
      axisBorder: {
        show: true,
        color: '#00E396'
      },
      labels: {
        style: {
          colors: '#00E396'
        }
      },
      title: {
        text: 'Spiders',
        style: {
          color: '#00E396'
        }
      }
    }
  ],
  xaxis: {
    type: 'datetime'
  }
})

const chartOptionsLine = ref({
  chart: {
    id: 'chart1',
    height: 130,
    type: 'area',
    brush: {
      target: 'chart2',
      enabled: true
    },
    selection: {
      enabled: true,
      xaxis: {
        min: new Date('24 April 2017').getTime(),
        max: new Date('29 May 2017').getTime()
      }
    }
  },
  colors: ['#008FFB', '#00E396'],
  stroke: {
    width: [1, 3],
    curve: ['straight', 'monotoneCubic']
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.91,
      opacityTo: 0.1
    }
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false
    }
  },
  yaxis: {
    max: 100,
    tickAmount: 2
  }
})

const mainChartRef = ref(null)
const brushChartRef = ref(null)

const handleSelection = (brushChartContext, { xaxis }) => {
  if (mainChartRef.value) {
    mainChartRef.value.zoomX(xaxis.min, xaxis.max)
  }
}
</script>

<style>
#wrapper {
  max-width: 650px;
  min-width: 600px;
}
</style>
