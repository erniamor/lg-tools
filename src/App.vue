<script setup lang="ts">
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/components.min.css";
import "agnostic-vue/dist/index.css";
import { RouterView } from "vue-router";
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <div class="container">
    <!-- Sidebar -->
    <aside class="container__sidebar">
      <Sidebar />
    </aside>
    <!-- Main -->
    <main class="container__main">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "@/assets/base.css";

.container {
  display: flex;
}

.container__sidebar {
  width: 20%;
  height: 100vh;
}

.container__main {
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  height: 100vh;
  overflow: auto;

}
</style>
