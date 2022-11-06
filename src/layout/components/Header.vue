<template>
  <div class="header-wrap">
    <div class="search-wrap">
      <el-button type="info" class="back" v-show="store.system.isFullScreen" circle @click="router.back()">
        <svg-icon name="arrow_left" />
      </el-button>
    </div>
    <el-space>
      <div class="btn" @click="BtnMinimize" style="background-color: #909399;">
        <svg-icon class="icon" name="min_window" />
      </div>
      <div class="btn" @click="BtnMaximize" style="background-color: #E6A23C;">
        <svg-icon class="icon" name="max_window" />
      </div>
      <div class=" btn " @click="BtnWinClose" style="background-color: #F56C6C;">
        <svg-icon class="icon" name="close_window" />
      </div>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import store from '@/utils/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const { ipcRenderer } = require('electron')

const BtnMinimize = (() => { ipcRenderer.send('min') })
const BtnMaximize = (() => { ipcRenderer.send('max') })
const BtnWinClose = (() => { ipcRenderer.send('close') })
</script>

<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  height: 40px;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dbclick {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .search-wrap {
    transform: translateY(6px);
    padding-left: 20px;
    display: flex;
    -webkit-app-region: no-drag;

    .back {
      color: #999999;
      margin-right: 20px;
      -webkit-app-region: no-drag;
    }

    .search-input {
      border-radius: 50%;
      -webkit-app-region: no-drag;
    }
  }

  .el-space {
    -webkit-app-region: no-drag;

    .btn {
      display: flex;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      opacity: 1;
      transition: opacity 0.2s;
    }

    &:hover {
      .icon {
        opacity: 1;
      }
    }
  }
}
</style>

