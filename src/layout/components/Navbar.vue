<template>
  <div class="navbar-wrap">
    <!-- 菜单折叠按钮 -->
    <slot name="collapse" class="collapse-btn"></slot>
    <div class="right-menu">
      <!-- 主题色 -->
      <!-- <el-color-picker v-model="color1" @change="changeTheme" /> -->
      <!-- 夜间模式-->
      <div class="dark-mode">
        <el-switch v-model="isDark" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Moon"
          :inactive-icon="Sunny" @change="toggleDark" />
      </div>
      <!-- 用户-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <el-avatar
            shape="circle"
            :size="40"
            :src="staffStore.staff?.avatar"
          ></el-avatar> -->
          mao
          {{ staffStore.staff?.staff_name }}
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>关于</el-dropdown-item>
            <el-dropdown-item @click="staffStore.logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useStaffStore } from '@/stores/staff'
import { ref } from 'vue';
// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 获取用户名字
const staffStore = useStaffStore()
</script>
<style scoped lang="scss">
.navbar-wrap {
  height: 20px;
  overflow: hidden;
  position: relative;
  background: var(--color-bg-1);
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  border-bottom: 1px solid var(--color-border-1);
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  // background: rgb(53, 54, 58) !important;
  // color: rgba(232, 234, 237, 1) !important;

  .right-menu {
    display: flex;

    // padding-right: 16px;
    .dark-mode {
      margin-right: 20px;
    }

    .avatar-container {
      margin-right: 20px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
