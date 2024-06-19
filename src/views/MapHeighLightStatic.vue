<template>
  <div id="map" ref="mapContainer" style="height: 80vh"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref(null)
let map = null
let geoJsonLayer = null
let selectedLayer = null

const initializeMap = () => {
  try {
    console.log('Initializing map...')
    // Set the initial view to Edmonton, Canada
    map = L.map(mapContainer.value).setView([53.5461, -113.4938], 10)
    console.log('Map initialized')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    console.log('Tile layer added')

    // Sample GeoJSON data
    const geojsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'Edmonton' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-113.7109375, 53.53035813025457],
                [-113.341796875, 53.53035813025457],
                [-113.341796875, 53.60418616886717],
                [-113.7109375, 53.60418616886717],
                [-113.7109375, 53.53035813025457]
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Leduc' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-113.56396484375, 53.23926068085944],
                [-113.3876953125, 53.23926068085944],
                [-113.3876953125, 53.28135637220094],
                [-113.56396484375, 53.28135637220094],
                [-113.56396484375, 53.23926068085944]
              ]
            ]
          }
        },
        {
          type: 'Feature',
          properties: { name: 'Beaumont' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-113.42138671875, 53.3478890581151],
                [-113.33447265625, 53.3478890581151],
                [-113.33447265625, 53.39309602749374],
                [-113.42138671875, 53.39309602749374],
                [-113.42138671875, 53.3478890581151]
              ]
            ]
          }
        }
      ]
    }

    geoJsonLayer = L.geoJson(geojsonData, {
      style: defaultStyle,
      onEachFeature: onEachFeature
    }).addTo(map)
    console.log('GeoJSON layer added')
  } catch (error) {
    console.error('Error initializing map:', error)
  }
}

const defaultStyle = {
  weight: 2,
  color: 'blue',
  dashArray: '',
  fillOpacity: 0.2
}

const highlightFeature = (e) => {
  try {
    const layer = e.target
    console.log('Layer clicked:', layer.feature.properties.name)

    layer.setStyle({
      weight: 5,
      color: 'orange', // Set the highlight color to orange
      dashArray: '',
      fillOpacity: 0.7
    })

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront()
    }

    resetHighlight()
    selectedLayer = layer

    // Zoom to the clicked layer
    map.fitBounds(layer.getBounds())
  } catch (error) {
    console.error('Error highlighting feature:', error)
  }
}

const resetHighlight = () => {
  try {
    if (selectedLayer) {
      geoJsonLayer.resetStyle(selectedLayer)
    }
  } catch (error) {
    console.error('Error resetting highlight:', error)
  }
}

const onEachFeature = (feature, layer) => {
  try {
    console.log('Attaching event to layer:', feature.properties.name)
    layer.on({
      click: highlightFeature
    })
  } catch (error) {
    console.error('Error attaching event:', error)
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
