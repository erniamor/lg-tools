<script setup lang="ts">
import SidebarHead from '@/components/SidebarHead.vue';
import SidebarNav from '@/components/SidebarNav.vue';
import SidebarFoot from '@/components/SidebarFoot.vue';
import { Divider } from "agnostic-vue";
</script>

<template>
  <div class="sidebar">
    <SidebarHead></SidebarHead>
    <Divider></Divider>
    <SidebarNav></SidebarNav>
    <SidebarFoot></SidebarFoot>
  </div>
</template>

<style>
.sidebar {
  background-color: #fafafa;
  border-right: 1px solid #ccc;
  min-height: 100%;
}
</style>
