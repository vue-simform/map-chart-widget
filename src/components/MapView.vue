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
// let geoJsonLayer = null
// let selectedLayer = null
const router = useRouter() // Initialize the router

const initializeMap = () => {
  try {
    console.log('Initializing map...')
    // Set the initial view to Edmonton, Canada
    map = L.map(mapContainer.value).setView([53.5461, -113.4938], 4)
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

// const defaultStyle = {
//   weight: 2,
//   color: 'blue',
//   dashArray: '',
//   fillOpacity: 0.2
// }

// const highlightFeature = (e) => {
//   try {
//     const layer = e.target
//     console.log('Layer clicked:', layer.feature.properties.name)

//     layer.setStyle({
//       weight: 5,
//       color: 'orange', // Set the highlight color to orange
//       dashArray: '',
//       fillOpacity: 0.7
//     })

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//       layer.bringToFront()
//     }

//     resetHighlight()
//     selectedLayer = layer

//     // Zoom to the clicked layer
//     map.fitBounds(layer.getBounds())
//   } catch (error) {
//     console.error('Error highlighting feature:', error)
//   }
// }

// const resetHighlight = () => {
//   try {
//     if (selectedLayer) {
//       geoJsonLayer.resetStyle(selectedLayer)
//     }
//   } catch (error) {
//     console.error('Error resetting highlight:', error)
//   }
// }

// const onEachFeature = (feature, layer) => {
//   try {
//     console.log('Attaching event to layer:', feature.properties.name)
//     layer.on({
//       click: highlightFeature
//     })
//   } catch (error) {
//     console.error('Error attaching event:', error)
//   }
// }

onMounted(() => {
  initializeMap()
})
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
