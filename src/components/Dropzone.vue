<template>
  <label for="dropzoneFile">
    <div @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
      @drop.prevent="onFileDroped" :class="{ 'active-dropzone': active }" class="dropzone">
      <span>Drag and Drop a file here</span>
      <input type="file" id="dropzoneFile" class="dropzoneFile" @change="onFileSelected" />
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(['onFiles'])

const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};
function onFileSelected(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  emit('onFiles', files);
}
function onFileDroped(e: DragEvent) {
  const files = e.dataTransfer?.files;
  emit('onFiles', files);
  active.value = false;
}
</script>

<style scoped>
.dropzone {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #41b883;
  background-color: #fff;
  transition: 0.3s ease all;

}

.dropzone label {
  padding: 8px 12px;
  color: #fff;
  background-color: #41b883;
  transition: 0.3s ease all;
}

.dropzone input {
  display: none;
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;

}

.active-dropzone label {
  background-color: #fff;
  color: #41b883;
}
</style>