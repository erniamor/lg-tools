<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";
const route = useRoute();
function isActive(routeName: string) {
  return route.name === routeName;
}
</script>
<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/converter" :class="['btn', isActive('converter') ? 'btn-primary' : 'btn-bordered']">Converter
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/sorter" :class="['btn', isActive('sorter') ? 'btn-primary' : 'btn-bordered']">Sorter
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  text-align: center;
  padding: 1em;
}

li {
  margin-bottom: 5px;
}

a {
  width: 100%;
}
</style>
