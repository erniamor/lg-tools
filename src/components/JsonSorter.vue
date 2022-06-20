<script setup lang="ts">
import { ref, computed } from "vue";
import { Input, Icon, Card, Button, Divider } from "agnostic-vue";
import { get, set } from "lodash";
import { saveAs } from "file-saver";
import getAllPaths from "@/utils/all-object-paths";
import Dropzone from "@/components/Dropzone.vue";
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

const inputModel = ref('');
const inputSorting = ref('');
const inputLg = ref(null);

function onModelFileChange(files: FileList) {
  if (files?.length) readModelFile(files[0]);
}
function onSortingFileChange(files: FileList) {
  if (files?.length) readSortingFile(files[0]);
}

function readModelFile(file: any) {
  var reader = new FileReader();
  reader.onload = (e: any) => {
    inputModel.value = JSON.parse(e.target.result);
  };
  reader.readAsText(file);
}
function readSortingFile(file: any) {
  inputLg.value = file.name.split(".json").join("");
  var reader = new FileReader();
  reader.onload = (e: any) => {
    inputSorting.value = JSON.parse(e.target.result);
  };
  reader.readAsText(file);
}

const inputText = computed(() => {
  return JSON.stringify(inputModel.value);
});
const outputText = computed(() => {
  return sortJson(inputModel.value, inputSorting.value);
});
function sortJson(dataModel: any, dataSorting: any) {
  if (dataModel && dataSorting) {
    const dataSorted = {};
    const paths = getAllPaths(dataModel)
    paths
      .forEach((key: string, index: number) => {
        set(dataSorted, key, get(dataSorting, key))
      })
    return JSON.stringify(dataSorted);
  }
  return "";
}

function downloadFile(str: string, filename: string) {
  saveAs(new Blob([str], { type: "text/plain;charset=utf-8" }), filename);
}

function exportOutput() {
  downloadFile(outputText.value, inputLg.value + ".json");
}


</script>

<template>
  <div class="p16">

  </div>

  <Card is-shadow class="mbe32">
    <div class="p16 full-width">
      <div class="card-title">Import JSON model</div>
      <Divider size="small"></Divider>
      <div class="full-width mbs16">
        <Dropzone @onFiles="onModelFileChange" accept="application/JSON" />
      </div>
    </div>
  </Card>

  <Card is-shadow class="mbe32">
    <div class="p16 full-width">
      <div class="card-title">Import JSON to sort</div>
      <Divider size="small"></Divider>
      <div class="full-width mbs16">
        <Dropzone @onFiles="onSortingFileChange" accept="application/JSON" />
      </div>
    </div>
  </Card>

  <Card is-shadow>
    <div class="p16 full-width">

      <div class="card-title">Preview</div>
      <Divider size="small"></Divider>
      <div class="flex items-center full-width">

        <div class="flex-grow-1">
          <Input id="input" label="JSON model" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="inputText" />
        </div>
        <div class="flex-grow-0">
          <Icon :size="48">
            <IconArrowRight></IconArrowRight>
          </Icon>
        </div>
        <div class="flex-grow-1">
          <Input id="output" label="JSON sorted" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="outputText" />
        </div>
      </div>
    </div>
  </Card>

  <div class="mbs16 flex justify-between">
    <div class="flex-grow-1">

    </div>
    <div class="flex-grow-0"><Button mode="primary" @click="exportOutput">Export Sorted JSON</Button></div>
  </div>
</template>

<style scoped>
.card-title {
  text-align: center;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.full-width {
  width: 100%;
}

.grid-1-1 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.field-switch {
  padding-left: 40px;
  padding-top: 10px;
}

.field-switch label {
  display: inline-block;
}
</style>