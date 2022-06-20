<script setup lang="ts">
import { Divider } from "agnostic-vue";
import JsonSorter from '@/components/JsonSorter.vue';
</script>

<template>
  <div class="wrapper">
    <h1>Sorter</h1>
    <Divider></Divider>
    <p class="mbs8">
      Allows to reorder a JSON file from a template.
    </p>
    <JsonSorter></JsonSorter>
  </div>
</template>
