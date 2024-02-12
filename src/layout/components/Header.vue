<template>
  <div class="header-wrap">
    <div class="search-wrap">
      <!-- 顶部 navbar -->
      <navbar>
        <template #collapse>
          <div class="collapse-btn" :class="{ row: props.isCollapse }">
            <svg-icon name="gengduo-heng" @click="hideIcon"></svg-icon>
          </div>
        </template>
      </navbar>
      <svg-icon name="arrow_left" v-show="!store.system.isFullScreen" @click="router.back()" />
      <!-- 标签 -->
      <tags-view></tags-view>
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
import navbar from './Navbar.vue'
import Navbar from './Navbar.vue'
import TagsView from './TagsView.vue'
const router = useRouter()
const BtnMinimize = (() => { window.ipcRenderer.send('min') })
const BtnMaximize = (() => { window.ipcRenderer.send('max') })
const BtnWinClose = (() => { window.ipcRenderer.send('close') })
const emit = defineEmits(['isCollapseClick'])
const props = defineProps({
  isCollapse: Boolean
})
const hideIcon = () => {
  emit("isCollapseClick")
}
</script>

<style lang="scss" scoped>
.search-wrap {
  height: 20px;
}

.header-wrap {
  width: 100%;
  height: 18px;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dbclick {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .el-button.is-circle {
    padding: unset;
  }

  .search-wrap {
    transform: translateY(6px);
    padding-left: 20px;
    display: flex;
    -webkit-app-region: no-drag;

    .back {
      // color: #999999;
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

