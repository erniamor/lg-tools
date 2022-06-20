<script setup lang="ts">
import { Divider } from "agnostic-vue";
import JsonSorter from '@/components/JsonSorter.vue';
</script>

<template>
  <div class="wrapper">
    <h1>Sorter</h1>
    <Divider></Divider>
    <p class="mbs8">
      Permet de réordonner un fichier JSON a partir d'un modele.
    </p>
    <JsonSorter></JsonSorter>
  </div>
</template>
