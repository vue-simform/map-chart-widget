<template>
  <div id="map" ref="mapContainer" style="height: 80vh"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import canadaGeoJson from '@/assets/canada-provinces.json'
// import canadaGeoJson from '@/assets/canada.geojson'
import { useRouter } from 'vue-router' // Import useRouter from vue-router

const mapContainer = ref(null)
let map = null
const router = useRouter() // Initialize the router

const initializeMap = () => {
  try {
    console.log('Initializing map...')
    // Set the initial view to Edmonton, Canada
    map = L.map(mapContainer.value).setView([53.5461, -113.4938], 3)
    console.log('Map initialized')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const geojsonLayer = L.geoJSON(canadaGeoJson, {
      style: {
        color: 'orange',
        weight: 2,
        fillColor: 'white',
        fillOpacity: 0.5
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => {
            const layer = e.target
            layer.setStyle({
              fillColor: 'orange',
              fillOpacity: 0.7
            })
          },
          mouseout: (e) => {
            const layer = e.target
            geojsonLayer.resetStyle(layer)
          },
          click: (e) => {
            map.fitBounds(e.target.getBounds())
            const layer = e.target
            layer.setStyle({
              fillColor: 'orange',
              fillOpacity: 0.7
            })
            router.push({ name: 'province-details', params: { province: feature.properties.name } })
          }
        })
      }
    }).addTo(map)
    console.log('GeoJSON layer added')
  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

onMounted(() => {
  initializeMap()
})
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
