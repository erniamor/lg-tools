<script setup lang="ts">
import { ref, computed } from "vue";
import { Input, Icon, Card, Button, Divider } from "agnostic-vue";
import { setWith } from "lodash";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import Dropzone from "@/components/Dropzone.vue";
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

const input = ref('');
const inputLg = ref('');
const currentLg = ref(null);
const inputMultipleLanguages = ref(true);
const inputIncludeOrder = ref(true);

function onFileChange(files: FileList) {
  if (files?.length) readFile(files[0]);
}

function readFile(file: File) {
  if (file) {
    inputLg.value = file.name.split(".csv").join("");
    var reader = new FileReader();
    reader.onload = (e: any) => {
      const result = String(e.target.result);
      detectIfOrderIsIncluded(result);
      detectIfMultipleLanguage(result);
      input.value = result;
    };
    reader.readAsText(file);
  }
}

function detectIfOrderIsIncluded(data: string) {
  const firstChar = data.charAt(0);
  inputIncludeOrder.value = (firstChar === '0')
}
function detectIfMultipleLanguage(data: string) {
  const keyString = inputIncludeOrder.value ? data.slice(2, 5) : data.slice(0, 3);
  inputMultipleLanguages.value = (keyString === 'key')
}

const inputText = computed(() => {
  if (input.value) return input.value;
  return '';
});

const outputText = computed(() => {
  if (inputMultipleLanguages.value === true) return convertCsvWithMultipleLanguage(input.value);
  else return convertCsvWithOneLanguage(input.value);
});

function convertCsvWithOneLanguage(data: any) {
  const withOrder = inputIncludeOrder.value;
  if (data) {
    let obj = {};
    const parsed = parse(data);
    parsed.data.forEach((item: any) => {
      if (withOrder) setWith(obj, item[1], item[2], Object);
      else setWith(obj, item[0], item[1], Object);
    });
    return JSON.stringify(obj);
  }
  return "";
}


function convertCsvWithMultipleLanguage(data: any) {
  const withOrder = inputIncludeOrder.value;
  const index = withOrder ? lgIndex.value + 1 : lgIndex.value;
  if (index) {
    let obj = {};
    parsed.value.slice(1).forEach((item: any) => {
      if (item[index]) setWith(obj, item[withOrder ? 1 : 0], item[index], Object);
    });
    return JSON.stringify(obj);
  }
  return "";
}

const parsed = computed(() => {
  if (input.value) return parse(input.value || "").data;
  return [];
});
const lgs = computed(() => {
  const withOrder = inputIncludeOrder.value;
  if (parsed.value && parsed.value.length) {
    const head = parsed.value[0] as string[];
    return head.slice(withOrder ? 2 : 1);
  }
  return [];
});
const lgIndex = computed(() => {
  if (currentLg.value) {
    return lgs.value.indexOf(currentLg.value || "") + 1;
  }
  return 0;
});


function downloadFile(str: string, filename: string) {
  saveAs(new Blob([str], { type: "text/plain;charset=utf-8" }), filename);
}
function exportOutput() {
  downloadFile(outputText.value, (currentLg.value || "lg") + ".json");
}

</script>

<template>
  <div class="p16">

  </div>

  <Card is-shadow class="mbe32">
    <div class="p16 full-width">
      <div class="card-title">Import CSV</div>
      <Divider size="small"></Divider>
      <div class="full-width mbs16">
        <Dropzone @onFiles="onFileChange" />
      </div>
    </div>
  </Card>

  <Card is-shadow class="mbe32">
    <div class="p16 full-width">
      <div class="card-title">Options</div>
      <Divider size="small"></Divider>
      <div class="grid-1-1 full-width">
        <div class="pbs16">

          <label class="checkbox-label-wrap">
            <input class="checkbox checkbox-small " type="checkbox" name="values" aria-hidden="true" focusable="false"
              v-model="inputMultipleLanguages" />
            <span class="checkbox-label checkbox-label-small"></span>
            <span class="checkbox-label-copy checkbox-label-copy-small">Source file contain multiple languages</span>
          </label>

          <label class="checkbox-label-wrap">
            <input class="checkbox checkbox-small " type="checkbox" name="order" aria-hidden="true" focusable="false"
              v-model="inputIncludeOrder" />
            <span class="checkbox-label checkbox-label-small"></span>
            <span class="checkbox-label-copy checkbox-label-copy-small">Source file include order</span>
          </label>

        </div>
        <div class="">
          <template v-if="lgs.length">
            <label>Select language :</label>
            <div v-for="(lg, lgIndex) in lgs" :key="lgIndex">
              <input type="radio" v-model="currentLg" :value="lg" /> {{ lg }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </Card>

  <Card is-shadow>
    <div class="p16 full-width">

      <div class="card-title">Preview</div>
      <Divider size="small"></Divider>
      <div class="flex items-center full-width">

        <div class="flex-grow-1">
          <Input id="input" label="CSV file content" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="inputText" />
        </div>
        <div class="flex-grow-0">
          <Icon :size="48">
            <IconArrowRight></IconArrowRight>
          </Icon>
        </div>
        <div class="flex-grow-1">
          <Input id="output" label="JSON file content" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="outputText" />
        </div>
      </div>
    </div>
  </Card>




  <div class="mbs16 flex justify-between">
    <div class="flex-grow-1">

    </div>
    <div class="flex-grow-0"><Button mode="primary" @click="exportOutput">Export JSON</Button></div>
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