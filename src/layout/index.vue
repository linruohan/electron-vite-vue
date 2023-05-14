<template>
  <el-container class="app-wrap">
    <el-aside v-show="!store.system.isFullScreen">
      <sidebar id="guide-sidebar" class="sidebar" :class="{ 'sidebar-container': !isCollapse }">
      </sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <Header ref="Head" :isCollapse="isCollapse" @isCollapseClick="isCollapseClick"></Header>
      </el-header>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import Main from "./components/Main.vue";
import Header from "./components/Header.vue";
import store from "@/utils/store";
import { provide, ref } from 'vue';

const isCollapse = ref(false)
provide('isCollapse', isCollapse)
const isCollapseClick = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="scss" scoped>
.app-wrap {
  width: 100%;
  height: 100%;

  .el-aside {
    width: auto;
  }

  .el-header {
    height: 24px;
    padding: 0;
  }

  .el-main {
    padding-right: 0;
  }

  .sidebar {
    // background: rgb(53, 54, 58) !important;
    // color: rgba(232, 234, 237, 1) !important;
  }
}
</style>
