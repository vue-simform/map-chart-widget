<template>
  <header class="header">
    <nav class="nav">
      <ul class="menu">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: currentItem === item.title }"
          class="pointer-cursor"
          @click="gotoPage(item.link)"
        >
          <!-- <router-link :to="item.link">{{ item.title }}</router-link> -->
          {{ item.title }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router' // Import useRouter from vue-router

const router = useRouter()
const gotoPage = (path) => {
  router.push(path)
}
const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'MapHeighLightStatic', link: '/mapStatic' },
  { title: 'MapHeighLightClick', link: '/mapClick' },
  { title: 'Chart', link: '/lineChart' },
  {
    title: 'WidgetChart',
    link: '/widgetChart'
  },
  {
    title: 'ChartApplication',
    link: '/chartApplication'
  },
  {
    title: 'FilterChart',
    link: '/filterChart'
  }
]

const currentRoute = useRoute()
const currentItem = ref(currentRoute.name || '')
</script>

<style scoped>
.pointer-cursor {
  cursor: pointer;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

/* .logo {
  font-size: 1.5rem;
} */

.nav {
  display: flex;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu li {
  margin-left: 1rem;
}

.menu li a {
  color: #fff;
  text-decoration: none;
}

.menu li.active a {
  font-weight: bold;
}

.toggle-menu {
  display: none;
}

/* @media (max-width: 768px) {
  .nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #333;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .toggle-menu {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #fff;
  }

  .nav.active {
    display: flex;
  }

  .menu {
    flex-direction: column;
  }

  .menu li {
    margin-left: 0;
    margin-bottom: 1rem;
  }
} */
</style>
