<template>
  <div>
    <div class="filter">
      <label for="time-frame">Select Time Frame:</label>
      <select id="time-frame" v-model="selectedTimeFrame" @change="applyFilter">
        <option value="all">All</option>
        <option value="last-month">Last Month</option>
        <option value="last-3-months">Last 3 Months</option>
        <option value="last-6-months">Last 6 Months</option>
        <!-- <option value="custom">Custom Range</option> -->
      </select>
      <div v-if="selectedTimeFrame === 'custom'">
        <label for="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          v-model="customRange.start"
          @change="applyCustomFilter"
        />
        <label for="end-date">End Date:</label>
        <input type="date" id="end-date" v-model="customRange.end" @change="applyCustomFilter" />
      </div>
    </div>

    <apexchart width="700" type="line" :options="chartOptions" :series="filteredSeries"></apexchart>
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
      { x: '2024-02-01', y: 70 },
      { x: '2024-03-01', y: 45 },
      { x: '2024-04-01', y: 20 },
      { x: '2024-05-01', y: 60 },
      { x: '2024-06-01', y: 50 },
      { x: '2024-07-01', y: 10 },
      { x: '2024-08-01', y: 120 },
      { x: '2024-09-01', y: 30 }
    ]
  }
])

const chartOptions = ref({
  chart: {
    id: 'main-chart',
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  xaxis: {
    type: 'datetime'
  },
  title: {
    text: 'Monthly Sales Data'
  }
})

const selectedTimeFrame = ref('all')
const customRange = ref({ start: '', end: '' })

const filteredSeries = computed(() => {
  let dateRange = { start: new Date('2024-01-01').getTime(), end: new Date('2024-09-01').getTime() }

  if (selectedTimeFrame.value !== 'all') {
    dateRange = getDateRange(selectedTimeFrame.value)
  } else if (
    selectedTimeFrame.value === 'custom' &&
    customRange.value.start &&
    customRange.value.end
  ) {
    dateRange.start = new Date(customRange.value.start).getTime()
    dateRange.end = new Date(customRange.value.end).getTime()
  }

  return series.value.map((serie) => ({
    ...serie,
    data: serie.data.filter(
      (point) =>
        new Date(point.x).getTime() >= dateRange.start &&
        new Date(point.x).getTime() <= dateRange.end
    )
  }))
})

const applyFilter = () => {
  if (selectedTimeFrame.value === 'custom' && customRange.value.start && customRange.value.end) {
    const startTime = new Date(customRange.value.start).getTime()
    const endTime = new Date(customRange.value.end).getTime()
    chartOptions.value.xaxis.min = startTime
    chartOptions.value.xaxis.max = endTime
  } else {
    const dateRange = getDateRange(selectedTimeFrame.value)
    chartOptions.value.xaxis.min = dateRange.start
    chartOptions.value.xaxis.max = dateRange.end
  }
}

const applyCustomFilter = () => {
  if (customRange.value.start && customRange.value.end) {
    const startTime = new Date(customRange.value.start).getTime()
    const endTime = new Date(customRange.value.end).getTime()
    chartOptions.value.xaxis.min = startTime
    chartOptions.value.xaxis.max = endTime
    let dateRange = {
      start: new Date('2024-01-01').getTime(),
      end: new Date('2024-09-01').getTime()
    }

    dateRange.start = new Date(customRange.value.start).getTime()
    dateRange.end = new Date(customRange.value.end).getTime()

    return series.value.map((serie) => ({
      ...serie,
      data: serie.data.filter(
        (point) =>
          new Date(point.x).getTime() >= dateRange.start &&
          new Date(point.x).getTime() <= dateRange.end
      )
    }))
  }
}

const getDateRange = (timeFrame) => {
  const now = new Date()
  let start, end

  switch (timeFrame) {
    case 'last-month':
      start = new Date(now.setMonth(now.getMonth() - 1)).getTime()
      end = Date.now()
      break
    case 'last-3-months':
      start = new Date(now.setMonth(now.getMonth() - 3)).getTime()
      end = Date.now()
      break
    case 'last-6-months':
      start = new Date(now.setMonth(now.getMonth() - 6)).getTime()
      end = Date.now()
      break
    default:
      start = new Date('2024-01-01').getTime()
      end = new Date('2024-09-01').getTime()
      break
  }

  return { start, end }
}

watch([customRange, selectedTimeFrame], applyFilter)
</script>

<style scoped>
.filter {
  margin-bottom: 20px;
}

#time-frame,
#start-date,
#end-date {
  margin-left: 10px;
}
</style>
