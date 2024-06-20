<template>
  <div style="padding-top: 5%">
    <h2>Using this with iframe</h2>
    <iframe :src="iframeSrc" width="100%" height="600px" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const iframeSrc = ref(import.meta.env.VITE_WIDGET_URL)
</script>
