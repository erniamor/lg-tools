<script setup lang="ts">
import { Divider, Tabs } from "agnostic-vue";
import JsonToCsv from '@/components/JsonToCsv.vue';
import CsvToJson from '@/components/CsvToJson.vue';
</script>

<template>
  <div class="wrapper">
    <h1>Converter</h1>
    <Divider></Divider>
    <p class="mbs8 mbe16">
      Allows to convert translation files from JSON to CSV format and vice versa.
    </p>
    <Tabs>
      <template #tab-1>
        JSON to CSV
      </template>
      <template #panel-1>
        <JsonToCsv></JsonToCsv>
      </template>

      <template #tab-2>
        CSV to JSON
      </template>
      <template #panel-2>
        <CsvToJson></CsvToJson>
      </template>
    </Tabs>
  </div>
</template>
