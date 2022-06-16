<script setup lang="ts">
import { ref, computed } from "vue";
import { Input, Icon, Card, Button, Divider } from "agnostic-vue";
import keys from "all-object-keys";
import { get } from "lodash";
import { saveAs } from "file-saver";
import Dropzone from "@/components/Dropzone.vue";
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

const input = ref('');
const inputLg = ref(null);
const outputLgs = ref('');
const outputMultipleLanguages = ref(true);
const outputIncludeValues = ref(true);
const outputIncludeOrder = ref(true);

function onFileChange(files: FileList) {
  if (files?.length) readFile(files[0]);
}

function readFile(file: any) {
  inputLg.value = file.name.split(".json").join("");
  var reader = new FileReader();
  reader.onload = (e: any) => {
    input.value = JSON.parse(e.target.result);
  };
  reader.readAsText(file);
}

const inputText = computed(() => {
  return JSON.stringify(input.value);
});
const validatedOutputLgs = computed(() => {
  return outputLgs.value.split(" ").filter((lg: string) => lg);
});
const outputText = computed(() => {
  if (outputMultipleLanguages.value === true) return convertJsonToMultipleLanguage(input.value, validatedOutputLgs.value);
  else return convertJsonToOneLanguage(input.value);
});
function convertJsonToOneLanguage(data: any) {
  const withValues = outputIncludeValues.value;
  const withOrder = outputIncludeOrder.value;
  if (data) {
    return keys(data)
      .map((key: string, index: number) => {

        const cols = [];

        if (withOrder) cols.push(index);
        cols.push(`"${key}"`)
        if (withValues) cols.push(`"${get(data, key).replace(/"/g, '""')}"`);

        return cols.join(';')

      })
      .join("\r\n");
  }
  return "";
}

function convertJsonToMultipleLanguage(data: any, lgs: string[]) {
  const withValues = outputIncludeValues.value;
  const withOrder = outputIncludeOrder.value;
  if (data) {
    const tab = keys(data).map((key: string, index: number) => {
      const cols = [];
      if (withOrder) cols.push(index + 1);
      cols.push(`"${key}"`)
      if (withValues) cols.push(`"${get(data, key).replace(/"/g, '""')}"`);
      lgs.forEach(lg => {
        cols.push("")
      })
      return cols.join(';')

    });
    // add header
    const headerCols = [];
    if (withOrder) headerCols.push(0);
    headerCols.push('key');
    if (withValues) headerCols.push(inputLg.value);
    lgs.forEach(lg => {
      headerCols.push(lg)
    })

    tab.unshift(headerCols.join(';'));
    return tab.join("\r\n");
  }
  return "";
}
function downloadFile(str: string, filename: string) {
  saveAs(new Blob([str], { type: "text/plain;charset=utf-8" }), filename);
}
function exportOutput() {
  downloadFile(outputText.value, (outputLgs.value || "lg") + ".csv");
}

</script>

<template>
  <div class="p16">

  </div>

  <Card is-shadow class="mbe32">
    <div class="p16 full-width">
      <div class="card-title">Import</div>
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
        <div class="">
          <Input id="languages" label="Selected languages" type="text" size="small"
            help-text="Separate each language with a SPACE" v-model="outputLgs" />
        </div>
        <div class="pbs16">

          <label class="checkbox-label-wrap">
            <input class="checkbox checkbox-small " type="checkbox" name="values" aria-hidden="true" focusable="false"
              v-model="outputMultipleLanguages" />
            <span class="checkbox-label checkbox-label-small"></span>
            <span class="checkbox-label-copy checkbox-label-copy-small">Export multiple language in one file</span>
          </label>

          <label class="checkbox-label-wrap">
            <input class="checkbox checkbox-small " type="checkbox" name="values" aria-hidden="true" focusable="false"
              v-model="outputIncludeValues" />
            <span class="checkbox-label checkbox-label-small"></span>
            <span class="checkbox-label-copy checkbox-label-copy-small">Include source values</span>
          </label>

          <label class="checkbox-label-wrap">
            <input class="checkbox checkbox-small " type="checkbox" name="order" aria-hidden="true" focusable="false"
              v-model="outputIncludeOrder" />
            <span class="checkbox-label checkbox-label-small"></span>
            <span class="checkbox-label-copy checkbox-label-copy-small">Include order</span>
          </label>

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
          <Input id="input" label="JSON file content" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="inputText" />
        </div>
        <div class="flex-grow-0">
          <Icon :size="48">
            <IconArrowRight></IconArrowRight>
          </Icon>
        </div>
        <div class="flex-grow-1">
          <Input id="output" label="CSV file content" type="textarea" size="small" :rows="10" :is-disabled="true"
            v-model="outputText" />
        </div>
      </div>
    </div>
  </Card>




  <div class="mbs16 flex justify-between">
    <div class="flex-grow-1">

    </div>
    <div class="flex-grow-0"><Button mode="primary" @click="exportOutput">Export</Button></div>
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