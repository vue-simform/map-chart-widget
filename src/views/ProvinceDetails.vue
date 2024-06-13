<template>
  <div>
    <h1>{{ province }}</h1>
    <!-- Display province details here -->
    <div id="map" ref="mapContainer" style="height: 80vh; width: 100%"></div>
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
  width: 100%;
}
</style>
