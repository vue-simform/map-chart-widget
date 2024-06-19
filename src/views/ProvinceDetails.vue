<template>
  <div class="map-page">
    <div class="head-container">
      <h1>{{ province }}</h1>
      Description: Northern Sunrise County is a municipal district in northern Alberta, Canada.
      Located in Census Division 17, its municipal office is located east of the Town of Peace River
      at the intersection of Highway 2 and Highway 688.
    </div>
    <div>
      <div id="map" ref="mapContainer" style="height: 60vh; margin: 3% 20%"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router' // Import useRoute from vue-router
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import canadaGeoJson from '@/assets/canada-provinces.json'

const route = useRoute() // Initialize the route
const province = ref(route.params.province)

const mapContainer = ref(null)

onMounted(() => {
  const map = L.map(mapContainer.value).setView([56.1304, -106.3468], 4) // Default coordinates

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  const selectedProvinceName = route.params.province

  L.geoJSON(canadaGeoJson, {
    style: {
      color: 'orange',
      weight: 2,
      fillColor: 'white',
      fillOpacity: 0.5
    },
    onEachFeature: (feature, layer) => {
      if (feature.properties.name === selectedProvinceName) {
        map.fitBounds(layer.getBounds(), {
          animate: true,
          duration: 1 // Duration of the zoom animation in seconds
        })

        layer.setStyle({
          fillColor: 'orange',
          fillOpacity: 0.7
        })
      }
    }
  }).addTo(map)
})
</script>

<style scoped>
#map {
  height: 100vh;
}
.head-container {
  margin: 2% 5% 0;
  font-size: 24px;
}
.map-page {
  display: flex;
  flex-direction: column;
}
</style>
