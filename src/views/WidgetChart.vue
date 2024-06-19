<template>
  <div>
    <iframe :src="iframeSrc" width="100%" height="600px" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const iframeSrc = ref('http://localhost:5174/')
</script>
