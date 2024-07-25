<template>
  <div style="padding-top: 5%">
    <div class="iframe-head-container">
      <h2>Iframe: chart</h2>
      <div>
        <button class="button-chart" @click="sendBarChartToIframe">Bar chart</button>
        <button class="button-chart" @click="sendLineChartToIframe">Line Chart</button>
      </div>
      <p v-if="medianFromChild !== null">Median from Child: {{ medianFromChild }}</p>
    </div>
    <hr />
    <iframe ref="iframeRef" :src="iframeSrc" width="100%" height="600px" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const iframeSrc = ref(import.meta.env.VITE_WIDGET_URL)
const iframeRef = ref(null)
const medianFromChild = ref(null)
const handleMessage = (event) => {
  if (event.origin === 'http://localhost:5174' && event.data.type === 'median') {
    medianFromChild.value = event.data.value
  }
}
onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
const chartData = ref({
  name: 'Donut',
  type: 'donut',
  series: [1, 55, 41, 17, 15]
})

const barChartData = ref({
  name: 'Bar Chart',
  type: 'bar',
  options: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: 'series-1',
      data: [8, 4, 3, 7, 5, 1, 9, 10]
    }
  ]
})

const lineChartData = ref({
  name: 'Line Chart',
  type: 'line',
  options: {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
})

const sendLineChartToIframe = () => {
  iframeRef.value.contentWindow.postMessage(
    JSON.parse(JSON.stringify(lineChartData.value)),
    iframeSrc.value
  )
}

const sendBarChartToIframe = () => {
  iframeRef.value.contentWindow.postMessage(
    JSON.parse(JSON.stringify(barChartData.value)),
    iframeSrc.value
  )
}
</script>

<style>
.iframe-head-container {
  padding: 2% 8%;
}

.button-chart {
  font-size: 18px;
  padding: 5px;
  margin: 0 2%;
}
</style>
